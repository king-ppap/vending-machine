from django.db import transaction
from .helper import find_min_change, adjust_money
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet, ReadOnlyModelViewSet, ModelViewSet
from .models import Product, Category, ItemsInMachine
from .serializers import ProductSerializer, CategorySerializer, ItemsInMachineSerializer, BuyItemRequestSerializer, BuyItemResponseSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from machine.serializers import VendingMachineSerializer
from machine.models import VendingMachine

import logging
logger = logging.getLogger(__name__)


class ProductViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ItemsInMachineViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = ItemsInMachine.objects.all()
    serializer_class = ItemsInMachineSerializer
    ordering_fields = '__all__'

import copy

class ItemsInMachineGenericViewSet(GenericViewSet):
    serializer_class = ItemsInMachineSerializer(many=True)
    queryset = ItemsInMachine.objects.all()

    @action(methods=['get'], detail=False, url_path='(?P<uuid>[^/.]+)')
    def get_items_in_machine_with_uuid(self, request, uuid):
        items = ItemsInMachine.objects.filter(machine__uuid=uuid).order_by('pk')
        return Response(ItemsInMachineSerializer(items, many=True, context={"request": request}).data)

    @extend_schema(
        request=BuyItemRequestSerializer,
        responses=BuyItemResponseSerializer,
    )
    @action(methods=['post'], detail=False, url_path='buy/(?P<item_id>[^/.]+)')
    @transaction.atomic
    def buy_item(self, request, item_id):
        body = BuyItemRequestSerializer(data=request.data)
        body.is_valid(raise_exception=True)
        userAmount = body.data.get('user_amount', 0)
        try:
            item = ItemsInMachine.objects.get(pk=item_id)
        except ItemsInMachine.DoesNotExist:
            return Response({"message": 'Not found ItemsInMachine'}, status=status.HTTP_404_NOT_FOUND)

        price = item.product.price
        change = userAmount - price
        if change < 0:
            return Response({"message": 'Insufficient funds'}, status=status.HTTP_400_BAD_REQUEST)

        result = find_min_change(change, copy.copy(item.machine.__dict__))

        if result == -1:
            refund = find_min_change(userAmount, copy.copy(item.machine.__dict__))

            resultUpdateMoney = adjust_money(item.machine, refund)
            vmR = VendingMachineSerializer(
                item.machine, data=resultUpdateMoney, partial=True)
            if vmR.is_valid():
                vmR.save()

            return Response({"message": 'Not enough money to change', "refund": refund}, status=505)

        item.count -= 1
        if item.count <= 0:
            item.delete()
        else:
            item.save()

        resultUpdateMoney = adjust_money(item.machine, result)
        vm = VendingMachineSerializer(
            item.machine, data=resultUpdateMoney, partial=True)
        if vm.is_valid():
            vm.save()

        return Response(BuyItemResponseSerializer(result).data)
