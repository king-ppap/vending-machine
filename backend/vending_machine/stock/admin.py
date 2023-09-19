from django.contrib import admin
from .models import Product, Category, ItemsInMachine


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    search_fields = [
        'code', 'name',
    ]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
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
