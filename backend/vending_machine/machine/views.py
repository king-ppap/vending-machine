from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet, ReadOnlyModelViewSet, ModelViewSet
from .models import VendingMachine
from .serializers import VendingMachineSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist


class VendingMachineViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = VendingMachine.objects.all()
    serializer_class = VendingMachineSerializer
