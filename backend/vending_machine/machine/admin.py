from django.contrib import admin
from .models import VendingMachine


@admin.register(VendingMachine)
class VendingMachineAdmin(admin.ModelAdmin):
    search_fields = [
        'code', 'name',
    ]
