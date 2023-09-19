from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet, ReadOnlyModelViewSet, ModelViewSet
from .models import Product, Category, ItemsInMachine
from .serializers import ProductSerializer, CategorySerializer, ItemsInMachineSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.core.exceptions import ObjectDoesNotExist

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
        return Response(ItemsInMachineSerializer(items, many=True).data)
