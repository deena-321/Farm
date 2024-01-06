"""
URL configuration for FarmBack project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from FarmApp.views import *

urlpatterns = [
    path('admins/', admins),
    path('create-account/', create_account, name="create_account"),
    path('signin/',signIn,name="sign_in"),
    path('screate-account/', screate_account, name="screate_account"),
    path('sSignin/',ssignIn,name="ssign_in"),
    path('create_product/', create_product, name='create_product'),
    path('productviews/', viewproduct, name='create_product'),
    path('product/<int:sid>/', get_product_details, name='view_product'),
    path('update/<int:pid>/<str:operation>/', update_product_quantity, name='update_product_quantity'),
    path('drop/<int:pid>/', remove_product, name='remove_product'),
    path('bcreate-account/', bcreate_account, name="screate_account"),
    path('cbcreate-account/', cbcreate_account, name="screate_account"),
    path('bSignin/',bsignIn,name="ssign_in"),
    path('nbSignin/',nbsignIn,name="ssign_in"),
    path('view_products/<int:bid>/',get_farm_products,name="ssign_in"),
    path('room/<int:seller_id>/<int:buyer_id>/', create_room, name='create_room'),
    path('get_rooms/<int:bid>/', get_rooms, name='get_rooms'),
    path('fget_rooms/<int:sid>/', fget_rooms, name='get_rooms'),
    path('send_msg/<str:name>/<str:password>/<int:sid>/<int:bid>/', send_message),
    path('adminSell/', seller_list_create, name="create_account"),
    path('adminProd/', farm_product_list_create, name="create_account"),
    path('sellers/<int:seller_id>/', approve_seller, name='approve-seller'),
    path('farm-products/<int:product_id>/',delete_farm_product, name='approve-seller'),
    path('delsellers/<int:seller_id>/', del_seller, name='approve-seller'),
    path('apfarm-products/<int:product_id>/',  approve_farm_product, name='approve-seller'),
    path('fetchcomments/<int:product_id>/', get_product_comments, name='get_product_comments'),
    path('postcomments/<int:product_id>/', create_product_comment, name='create_product_comment'),
]

