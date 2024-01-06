from django.db import models
from django_resized import ResizedImageField
# Create your models here.
import base64
class Buyer(models.Model):
    bid=models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    phoneno = models.CharField(max_length=20)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    address = models.TextField()
    location=models.CharField(max_length=100,default="Chennai")

    def __str__(self):
        return self.name

class Admin(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
   

    def __str__(self):
        return self.name
    

class Seller(models.Model):

    sid= models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    is_approved = models.BooleanField(default=False)
    subscription_plans = models.CharField(max_length=50, null=True, blank=True)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    transaction_id = models.CharField(max_length=100, null=True, blank=True)
    aadhar = models.BinaryField(null=True,blank=True)
    farmId= models.BinaryField(null=True,blank=True)
    location=models.CharField(max_length=100,default="Chennai")


    def __str__(self):
        return self.name
    
class FarmProduct(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    product_type = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)
    image = models.BinaryField() 
    description = models.TextField()
    is_approved = models.BooleanField(default=False)# Assuming you want to store the image as binary data
    cost = models.PositiveIntegerField(default=50)
    def __str__(self):
        return self.name
    
class Comment(models.Model):
    product = models.ForeignKey(FarmProduct, related_name='comments', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text
    
class Room(models.Model):
    bid =  models.ForeignKey(Buyer, on_delete=models.CASCADE) # Primary key from the Buyer model
    sid =  models.ForeignKey(Seller, on_delete=models.CASCADE)  # Primary key from the Seller model
    name = models.CharField(max_length=255, blank=False)
    password = models.CharField(max_length=255, blank=False)

    def __str__(self):
        return str(self.name)

    
class Chat(models.Model):
    room = models.CharField(max_length=255, blank=False)
    bid = models.ForeignKey(Buyer, on_delete=models.CASCADE)  # Primary key from the Buyer model
    sid = models.ForeignKey(Seller, on_delete=models.CASCADE)  # Primary key from the Seller model
    message = models.TextField(blank=True)
    sender= models.CharField(max_length=255,default='buyer')
    image = models.BinaryField(null=True,blank=True) 


    

    