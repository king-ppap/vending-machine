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
        'machine__code', 'machine__name', 'product__code', 'product__name',
    ]
    list_display = [
        'machine', 'product', 'count',
    ]
    list_filter = ['machine__name']
