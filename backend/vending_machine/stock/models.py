from django.db import models
from machine.models import VendingMachine
from django.utils.html import mark_safe


class Category(models.Model):
    code = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Product(models.Model):
    code = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=255)
    price = models.FloatField()
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    image = models.ImageField(upload_to='product/')

    def __str__(self):
        return self.name

    def display_image_preview(self):
        if not self.image:
            return mark_safe('<p>No image</p>')
        return mark_safe(f'<img src="{self.image.url}" style="max-height: 250px; max-width: 500px;" />')


class ItemsInMachine(models.Model):
    machine = models.ForeignKey(VendingMachine, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    count = models.SmallIntegerField(default=0)

    def __str__(self):
        return f'{self.machine.name} - {self.product.name}'
