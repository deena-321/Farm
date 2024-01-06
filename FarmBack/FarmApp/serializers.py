from rest_framework import serializers
from .models import *

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'

class FarmProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmProduct
        fields = ('seller', 'name', 'product_type', 'quantity', 'is_available', 'image','description','is_approved')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'product', 'text', 'created_at')
        read_only_fields = ('id', 'product', 'created_at')