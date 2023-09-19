from django.contrib import admin
from .models import VendingMachine, ItemsInMachine


@admin.register(VendingMachine)
class VendingMachineAdmin(admin.ModelAdmin):
    search_fields = [
        'code', 'name',
    ]


@admin.register(ItemsInMachine)
class ItemsInMachineAdmin(admin.ModelAdmin):
    search_fields = [
        'machine', 'product',
    ]
    list_display = [
        'machine', 'product', 'count',
    ]
