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


class BuyItemRequestSerializer(serializers.Serializer):
    user_amount = serializers.IntegerField()


class BuyItemResponseSerializer(serializers.Serializer):
    coin_1 = serializers.IntegerField()
    coin_5 = serializers.IntegerField()
    coin_10 = serializers.IntegerField()
    banknote_20 = serializers.IntegerField()
    banknote_50 = serializers.IntegerField()
    banknote_100 = serializers.IntegerField()
    banknote_500 = serializers.IntegerField()
    banknote_1000 = serializers.IntegerField()
