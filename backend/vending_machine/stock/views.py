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
    @action(methods=['post'], detail=False, url_path='buy/(?P<item_id>[^/.]+)')
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

        result = findMinChange(change, item.machine.__dict__)
        if result == -1:
            return Response({"message": 'Not enough money to change'}, status=505)

        item.count -= 1
        if item.count <= 0:
            item.delete()
        else:
            item.save()

        resultUpdateMoney = {
            "uuid": item.machine.uuid,
            "coin_1": item.machine.coin_1 - result["coin_1"],
            "coin_5": item.machine.coin_5 - result["coin_5"],
            "coin_10": item.machine.coin_10 - result["coin_10"],
            "banknote_20": item.machine.banknote_20 - result["banknote_20"],
            "banknote_50": item.machine.banknote_50 - result["banknote_50"],
            "banknote_100": item.machine.banknote_100 - result["banknote_100"],
            "banknote_500": item.machine.banknote_500 - result["banknote_500"],
            "banknote_1000": item.machine.banknote_1000 - result["banknote_1000"],
        }
        logger.debug(resultUpdateMoney)
        vm = VendingMachineSerializer(item.machine, data=resultUpdateMoney, partial=True)
        if vm.is_valid():
            vm.save()

        return Response(BuyItemResponseSerializer(result).data)
