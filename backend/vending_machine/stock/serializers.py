from rest_framework import serializers
from .models import Product, Category, ItemsInMachine


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ItemsInMachineSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = ItemsInMachine
        fields = '__all__'
