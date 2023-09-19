from django.contrib import admin
from .models import VendingMachine


@admin.register(VendingMachine)
class VendingMachineAdmin(admin.ModelAdmin):
    readonly_fields = [
        'uuid'
    ]
    list_display = [
        'uuid',
        'name',
    ]
    search_fields = [
        'uuid',
        'name',
    ]
