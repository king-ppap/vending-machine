from .helper import findMinChange
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


class ItemsInMachineGenericViewSet(GenericViewSet):
    serializer_class = ItemsInMachineSerializer(many=True)
    queryset = ItemsInMachine.objects.all()

    @action(methods=['get'], detail=False, url_path='(?P<uuid>[^/.]+)')
    def get_items_in_machine_with_uuid(self, request, uuid):
        items = ItemsInMachine.objects.filter(machine__uuid=uuid)
        return Response(ItemsInMachineSerializer(items, many=True, context={"request": request}).data)

    @extend_schema(
        request=BuyItemRequestSerializer,
        responses=BuyItemResponseSerializer,
    )
    @action(methods=['post'], detail=False, url_path='(?P<uuid>[^/.]+)/buy/(?P<item_id>[^/.]+)')
    def buy_item(self, request, uuid, item_id):
        body = BuyItemRequestSerializer(data=request.data)
        body.is_valid(raise_exception=True)
        userAmount = body.data.get('user_amount', 0)

        vm = VendingMachine.objects.get(uuid=uuid)
        item = ItemsInMachine.objects.get(pk=item_id)
        price = item.product.price
        change = userAmount - price
        if change < 0:
            return Response({"message": 'Insufficient funds'}, status=status.HTTP_400_BAD_REQUEST)

        result = findMinChange(change, vm.__dict__)
        if result == -1:
            return Response({"message": 'Not enough money to change'}, status=505)

        return Response(BuyItemResponseSerializer(result).data)
