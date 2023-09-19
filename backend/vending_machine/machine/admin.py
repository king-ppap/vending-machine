from django.contrib import admin
from .models import VendingMachine


@admin.register(VendingMachine)
class VendingMachineAdmin(admin.ModelAdmin):
    readonly_fields = [
        'code'
    ]
    list_display = [
        'code',
        'name',
    ]
    search_fields = [
        'code',
        'name',
    ]
