from django.http import JsonResponse,HttpResponseBadRequest
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
import json
import base64
from .serializers import *
from .models import *
from django.core.mail import send_mail
from PIL import Image
from io import BytesIO
from geopy.geocoders import Nominatim
from geopy.distance import great_circle
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import CommentSerializer


@csrf_exempt
def create_account(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            name = data.get("name", "")
            email = data.get("email", "")
            password = data.get("password", "")
            location = data.get("location", "")
            buyer = Buyer(name=name, email=email, password=password,location=location)
            buyer.save()
            response_data = {"message": "Account created successfully"}
            return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
@csrf_exempt
def signIn(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get("email", "")
            password = data.get("password", "")

            try:
                user = Buyer.objects.get(email=email)
                if password == user.password:
                    # Successful sign-in
                    return JsonResponse({"message": "Sign-in successful"})
                else:
                    # Password doesn't match
                    return JsonResponse({"message": "Invalid email or password"}, status=401)
            except ObjectDoesNotExist:
                # User with the given email doesn't exist
                return JsonResponse({"message": "User not found"}, status=404)
        except json.JSONDecodeError:
            # Invalid JSON data
            return JsonResponse({"message": "Invalid JSON data"}, status=400)
    else:
        # Handle other HTTP methods if needed
        return JsonResponse({"message": "Method not allowed"}, status=405)
    
@csrf_exempt
def admins(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            name = data.get("name", "")
            password = data.get("password", "")

            try:
                user = Admin.objects.get(name=name)
                if password == user.password:
                    # Successful sign-in
                    return JsonResponse({"message": "Sign-in successful"})
                else:
                    # Password doesn't match
                    return JsonResponse({"message": "Invalid email or password"}, status=401)
            except ObjectDoesNotExist:
                # User with the given email doesn't exist
                return JsonResponse({"message": "User not found"}, status=404)
        except json.JSONDecodeError:
            # Invalid JSON data
            return JsonResponse({"message": "Invalid JSON data"}, status=400)
    else:
        # Handle other HTTP methods if needed
        return JsonResponse({"message": "Method not allowed"}, status=405)
@csrf_exempt   
def screate_account(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        location=request.POST.get('location')
        subscription_plan = request.POST.get('subscriptionPlan')
        aadhar_card_image = request.FILES.get('aadharCardImage')
        farmer_ids_image = request.FILES.get('farmerIdsImage')
        transaction_id = request.POST.get('transactionId')
        amtpaid=request.POST.get('amountToPay')
        if aadhar_card_image:
            pil_image = Image.open(aadhar_card_image)
            img_io = BytesIO()
            pil_image.save(img_io, format='JPEG')
            aadhar_card_images = img_io.getvalue()
        else:
            aadhar_card_images = None
        
        if farmer_ids_image:
            pil_image = Image.open(farmer_ids_image)
            img_io = BytesIO()
            pil_image.save(img_io, format='JPEG')
            farmer_ids_images = img_io.getvalue()
        else:
            farmer_ids_images = None

        seller = Seller(
            name=name,
            email=email,
            password=password,
            amount_paid=amtpaid,
            subscription_plans=subscription_plan,
            location=location,
            transaction_id=transaction_id,
            aadhar=aadhar_card_images,  # Assuming BinaryField stores binary data
            farmId=farmer_ids_images  # Assuming BinaryField stores binary data
        )
        seller.save()

        # Additional logic to handle image processing and other operations

        return JsonResponse({'message': 'Account created successfully'}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def ssignIn(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get("email", "")
            password = data.get("password", "")

            try:
                user = Seller.objects.get(email=email)
                if password == user.password:
                    # Successful sign-in
                    return JsonResponse({"message": "Sign-in successful", "user_id": user.sid})
                else:
                    # Password doesn't match
                    return JsonResponse({"message": "Invalid email or password"}, status=401)
            except ObjectDoesNotExist:
                # User with the given email doesn't exist
                return JsonResponse({"message": "User not found"}, status=404)
        except json.JSONDecodeError:
            # Invalid JSON data
            return JsonResponse({"message": "Invalid JSON data"}, status=400)
    else:
        # Handle other HTTP methods if needed
        return HttpResponseBadRequest("Method not allowed")
    
@csrf_exempt
def create_product(request):
    if request.method == 'POST':
        seller_id = request.POST.get('seller')
        name = request.POST.get('name')
        product_type = request.POST.get('product_type')
        quantity = request.POST.get('quantity')
        description = request.POST.get('description')
        image = request.FILES.get('image')
        is_approved = request.POST.get('is_approved', False)
        cost = request.POST.get('cost')

        # Check if image file is provided
        if image:
            # Open the image using Pillow
            pil_image = Image.open(image)
            
            # Resize the image if needed
            # pil_image = pil_image.resize((width, height))

            # Convert the image to bytes
            img_io = BytesIO()
            pil_image.save(img_io, format='JPEG')
            img_data = img_io.getvalue()
        else:
            img_data = None

        # Create the product object
        product = FarmProduct(
            seller_id=seller_id,
            name=name,
            product_type=product_type,
            quantity=quantity,
            description=description,
            image=img_data,  # Assign the image data here
            is_approved=is_approved,
            cost=cost
        )

        # Save the product to the database
        product.save()

        return JsonResponse({'message': 'Product created successfully'}, status=201)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
@csrf_exempt
def get_product_details(request, sid):
    print(f"Received seller ID: {sid}") 
    try:
        products = FarmProduct.objects.filter(seller=sid)
        product_list = []
        for product in products:
            product_data = {
                'id':product.id,
                'name': product.name,
                'product_type': product.product_type,
                'quantity': product.quantity,
                'is_available': product.is_available,
                'description': product.description,
                # Handle other fields if needed
            }
            product_list.append(product_data)
        
        return JsonResponse({'products': product_list})
    except FarmProduct.DoesNotExist:
        print('Product not found')
        return JsonResponse({'error': 'Products not found for the given seller ID'}, status=404)


@csrf_exempt
def update_product_quantity(request, pid, operation):

    try:
        product = FarmProduct.objects.get(id=pid)
        if operation == "add":
            new_quantity = product.quantity + 1  # Increase the quantity by 1
        elif operation == "subtract":
            new_quantity = product.quantity - 1  # Decrease the quantity by 1
        else:
            return JsonResponse({'error': 'Invalid operation'}, status=400)
       
        product.quantity = new_quantity
        product.save()
        return JsonResponse({'success': True, 'message': 'Product quantity updated successfully'})
    except FarmProduct.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)

@csrf_exempt
def remove_product(request, pid):
    try:
        product = FarmProduct.objects.get(id=pid)
        product.delete()
        return JsonResponse({'success': True, 'message': 'Product removed successfully'})
    except FarmProduct.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)
    

@csrf_exempt
def bcreate_account(request):
    if request.method=='POST':
        try:
            data=json.loads(request.body.decode('utf-8'))
            name=data.get('name',"")
            email=data.get('email',"")
            password=data.get('password',"")
            seller = Buyer(name=name, email=email, password=password)
            seller.save()
            response_data = {"message": "Account created successfully"}
            return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def cbcreate_account(request):
    if request.method=='POST':
        try:
            data=json.loads(request.body.decode('utf-8'))
            name=data.get('name',"")
            email=data.get('email',"")
            password=data.get('password',"")
            seller = Buyer(name=name, email=email, password=password)
            seller.save()
           
            response_data = {"success": True,"bid": seller.bid}
            return JsonResponse(response_data)
        except json.JSONDecodeError as e:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
@csrf_exempt
def bsignIn(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get("email", "")
            password = data.get("password", "")

            try:
                user = Buyer.objects.get(email=email)
                if password == user.password:
                    # Successful sign-in
                    return JsonResponse({"message": "Sign-in successful", "user_id": user.bid})
                else:
                    # Password doesn't match
                    return JsonResponse({"message": "Invalid email or password"}, status=401)
            except ObjectDoesNotExist:
                # User with the given email doesn't exist
                return JsonResponse({"message": "User not found"}, status=404)
        except json.JSONDecodeError:
            # Invalid JSON data
            return JsonResponse({"message": "Invalid JSON data"}, status=400)
    else:
        # Handle other HTTP methods if needed
        return HttpResponseBadRequest("Method not allowed")
    
@csrf_exempt
def nbsignIn(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get("email", "")
            password = data.get("password", "")

            try:
                user = Buyer.objects.get(email=email)
                if password == user.password:
                    # Successful sign-in
                    return JsonResponse({"message": "Sign-in successful", "bid": user.bid})
                else:
                    # Password doesn't match
                    return JsonResponse({"message": "Invalid email or password"}, status=401)
            except ObjectDoesNotExist:
                # User with the given email doesn't exist
                return JsonResponse({"message": "User not found"}, status=404)
        except json.JSONDecodeError:
            # Invalid JSON data
            return JsonResponse({"message": "Invalid JSON data"}, status=400)
    else:
        # Handle other HTTP methods if needed
        return HttpResponseBadRequest("Method not allowed")
    
def get_coordinates(city_name):
    geolocator = Nominatim(user_agent="my_geocoder")
    location = geolocator.geocode(city_name)
    if location:
        return location.latitude, location.longitude
    else:
        return None, None  
    
    
@csrf_exempt
def viewproduct(request):
  
    products = FarmProduct.objects.filter(is_available=True,is_approved=True)
    product_list = []
    for product in products:
        image_base64 = base64.b64encode(product.image).decode('utf-8') if product.image else None
        product_list.append({
            'name': product.name,
            'owner_name': product.seller.name,
            'product_type': product.product_type,
            'quantity': product.quantity,
            'description': product.description,
            'image': image_base64,
            'cost':product.cost,
            'sid':product.seller.sid
            
        })
      
    return JsonResponse({'products': product_list}) 
    
@csrf_exempt
def get_farm_products(request,bid):
    user = Buyer.objects.get(pk=bid)
    locas=user.location
    products = FarmProduct.objects.filter(is_available=True,is_approved=True)
    product_list = []
    for product in products:
        image_base64 = base64.b64encode(product.image).decode('utf-8') if product.image else None
        product_list.append({
            'name': product.name,
            'owner_name': product.seller.name,
            'owner_sub': product.seller.subscription_plans,
            'product_type': product.product_type,
            'quantity': product.quantity,
            'description': product.description,
            'image': image_base64,
            'pid':product.seller.sid,
            'cost':product.cost,
            'id':product.pk,
            
        })
    return JsonResponse({'products': product_list})   

@api_view(['GET'])
def get_product_comments(request, product_id):
    """
    Retrieve comments for a specific product.
    """
    product = get_object_or_404(FarmProduct, pk=product_id)
    comments = Comment.objects.filter(product=product)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_product_comment(request, product_id):
    """
    Create a new comment for a specific product.
    """
    product = get_object_or_404(FarmProduct, pk=product_id)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(product=product)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt

# def get_farm_products(request, bid):
#     user = Buyer.objects.get(pk=bid)
#     buyer_city = user.location  # Assuming Buyer model has a 'city' field
    
#     products = FarmProduct.objects.filter(is_available=True, is_approved=True)
#     products_list = []
    
#     for product in products:
#         seller_city = product.seller.location  # Assuming Seller model has a 'city' field
        
#         # Get coordinates for buyer and seller cities
#         buyer_latitude, buyer_longitude = get_coordinates(buyer_city)
#         seller_latitude, seller_longitude = get_coordinates(seller_city)
        
#         # Calculate distance between buyer and seller locations using great-circle distance
#         if buyer_latitude is not None and buyer_longitude is not None and seller_latitude is not None and seller_longitude is not None:
#             distance = great_circle((buyer_latitude, buyer_longitude), (seller_latitude, seller_longitude)).kilometers
#         else:
#             distance = None
        
#         image_base64 = base64.b64encode(product.image).decode('utf-8') if product.image else None
#         products_list.append({
#             'name': product.name,
#             'owner_name': product.seller.name,
#             'product_type': product.product_type,
#             'quantity': product.quantity,
#             'description': product.description,
#             'image': image_base64,
#             'pid': product.seller.sid,
#             'cost': product.cost,
#             'distance': distance  # Include distance in the product dictionary
#         })
    
#     # Remove products with None distances (due to geocoding issues)
#     products_list = [product for product in products_list if product['distance'] is not None]
    
#     # Sort product_list based on distance in ascending order (closest to farthest)
#     product_list = sorted(products_list, key=lambda x: x['distance'])
#     print(product_list)
    
#     return JsonResponse({'products': product_list})

@csrf_exempt
def create_room(request, seller_id, buyer_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            room_name = data.get('name')
            room_password = data.get('password')

            buyer = Buyer.objects.get(pk=buyer_id)
            seller = Seller.objects.get(pk=seller_id)

            # Create a new Room instance
            room = Room(name=room_name, password=room_password, bid=buyer, sid=seller)
            room.save()

            return JsonResponse({'status': 'Room created successfully'}, status=201)
        except Buyer.DoesNotExist:
            return JsonResponse({'error': 'Buyer not found'}, status=404)
        except Seller.DoesNotExist:
            return JsonResponse({'error': 'Seller not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def send_message(request, name, password, sid, bid):
    if request.method == 'POST':
        try:
            message = request.POST.get('message')
            sender = request.POST.get('sender')
            images = request.FILES.get('image') 
            
            if images:
                pil_image = Image.open(images)
                img_io = BytesIO()
                pil_image.save(img_io, format='JPEG')
                img_data = img_io.getvalue()
            else:
                img_data = None
            buyer = Buyer.objects.get(pk=bid)
            seller = Seller.objects.get(pk=sid)
            chat = Chat(room=name, bid=buyer, sid=seller, message=message, sender=sender,image=img_data)
            chat.save()

            return JsonResponse({'status': 'Message sent successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'GET':
        try:
            chat_messages = Chat.objects.filter(room=name, sid=sid, bid=bid)
            buyer = Buyer.objects.get(pk=bid)
            seller = Seller.objects.get(pk=sid)
           
            messages = []
            for chat in chat_messages:
                image_base64 = base64.b64encode(chat.image).decode('utf-8') if chat.image else None
                messages.append({'message': chat.message, 'sender': chat.sender, 'image': image_base64, 'name':buyer.name, 'sname':seller.name})
            return JsonResponse(messages, safe=False)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def get_rooms(request, bid):
    if request.method == 'GET':
        try:
            rooms = Room.objects.filter(bid=bid)
            room_list = [{'id': room.id, 'name': room.name, 'bid': room.bid_id, 'siid': room.sid_id, 'password': room.password} for room in rooms]
            
            return JsonResponse(room_list, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def fget_rooms(request, sid):
    
    if request.method == 'GET':
        try:
          
            rooms = Room.objects.filter(sid=sid)
            room_list = [{'id': room.id, 'name': room.name, 'bid': room.bid_id, 'siid': room.sid_id, 'password': room.password} for room in rooms]
           
            return JsonResponse(room_list, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    
@csrf_exempt
def seller_list_create(request):
    if request.method == 'GET':
        sellers = Seller.objects.filter(is_approved=False)
        seller_list = []
        for seller in sellers:
             
            aadhar = base64.b64encode(seller.aadhar).decode('utf-8') if seller.aadhar else None
            farmId = base64.b64encode(seller.farmId).decode('utf-8') if seller.farmId else None
            seller_data = {
                'sid': seller.sid,
                'name': seller.name,
                'email': seller.email,
                'subscription_plans': seller.subscription_plans,
                'amount_paid': seller.amount_paid,
                'transaction_id': seller.transaction_id,
                'aadhar':aadhar,
                'farmId':farmId
            }
            seller_list.append(seller_data)

        return JsonResponse({'sellers': seller_list}, safe=False)
    
@csrf_exempt
def farm_product_list_create(request):
    if request.method == 'GET':
        farm_products = FarmProduct.objects.filter(is_approved=False)
        product_list = []
        for product in farm_products:
            prod = base64.b64encode(product.image).decode('utf-8') if product.image else None
            product_data = {
                'id': product.id,
                'seller_id': product.seller.sid,
                'name': product.name,
                'product_type': product.product_type,
                'quantity': product.quantity,
                'is_available': product.is_available,
                'description': product.description,
                'image':prod
            }
            product_list.append(product_data)
        
        return JsonResponse({'products': product_list}, safe=False)
    
@csrf_exempt
def approve_seller(request, seller_id):
    try:
        seller = Seller.objects.get(sid=seller_id)
        seller.is_approved = True
        seller.save()

        # Send approval email to the seller
        subject = 'Seller Approval Notification'
        message = f'Hello {seller.name},\n\nYour seller account (Seller ID: {seller.sid}) has been approved successfully!'
        from_email = '12345deena123@gmail.com'  # Replace with your email
        recipient_list = [seller.email]  # Assuming seller model has an 'email' field

        send_mail(subject, message, from_email, recipient_list, fail_silently=False)

        return JsonResponse({'message': 'Seller approved successfully!'})
    except Seller.DoesNotExist:
        return JsonResponse({'error': 'Seller not found!'}, status=404)

@csrf_exempt
def del_seller(request, seller_id):
    try:
        seller = Seller.objects.get(sid=seller_id)
        subject = 'Seller Rejection Notification'
        message = f'Hello {seller.name},\n\nYour seller account (Seller ID: {seller.sid}) has been Rejected!'
        from_email = '12345deena123@gmail.com'  # Replace with your email
        recipient_list = [seller.email]  # Assuming seller model has an 'email' field

        send_mail(subject, message, from_email, recipient_list, fail_silently=False)
       
        seller.delete()
        return JsonResponse({'message': 'Seller approved successfully!'})
    except Seller.DoesNotExist:
        return JsonResponse({'error': 'Seller not found!'}, status=404)

@csrf_exempt
def delete_farm_product(request, product_id):
    try:
        farm_product = FarmProduct.objects.get(id=product_id)
        farm_product.delete()
        return JsonResponse({'message': 'Farm product deleted successfully!'})
    except FarmProduct.DoesNotExist:
        return JsonResponse({'error': 'Farm product not found!'}, status=404)
    
@csrf_exempt
def approve_farm_product(request, product_id):
    try:
        farm_product = FarmProduct.objects.get(id=product_id)
        farm_product.is_approved = True
        farm_product.save()
        return JsonResponse({'message': 'Farm product deleted successfully!'})
    except FarmProduct.DoesNotExist:
        return JsonResponse({'error': 'Farm product not found!'}, status=404)