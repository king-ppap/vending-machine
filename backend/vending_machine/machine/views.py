from rest_framework import status
from django.forms.models import model_to_dict
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from .models import VendingMachine
from .serializers import VendingMachineSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from stock.helper import find_min_change, adjust_money
from stock.serializers import BuyItemResponseSerializer
from drf_spectacular.utils import extend_schema


class VendingMachineViewSet(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = VendingMachine.objects.all()
    serializer_class = VendingMachineSerializer


class VendingMachineGenericViewSet(GenericViewSet):
    serializer_class = VendingMachineSerializer(many=True)
    queryset = VendingMachine.objects.all()

    @extend_schema(
        responses=BuyItemResponseSerializer,
    )
    @action(methods=['post'], detail=False, url_path='(?P<uuid>[^/.]+)/refund/(?P<amount>[^/.]+)')
    def refund_money(self, request, uuid: str, amount: str):
        try:
            machine = VendingMachine.objects.get(uuid=uuid)
        except VendingMachine.DoesNotExist:
            return Response({"message": 'Not found VendingMachine'}, status=status.HTTP_404_NOT_FOUND)

        refund = find_min_change(int(amount), model_to_dict(machine))

        resultUpdateMoney = adjust_money(machine, refund)
        vmR = VendingMachineSerializer(
            machine, data=resultUpdateMoney, partial=True)
        if vmR.is_valid():
            vmR.save()

        return Response(BuyItemResponseSerializer(refund).data)
