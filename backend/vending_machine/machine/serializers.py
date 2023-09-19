from rest_framework import serializers
from .models import VendingMachine

class VendingMachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendingMachine
        fields = '__all__'
