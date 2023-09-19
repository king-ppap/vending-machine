from django.db import models
from machine.models import VendingMachine

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
    image = models.TextField(blank=True)

    def __str__(self):
        return self.name

class ItemsInMachine(models.Model):
    machine = models.ForeignKey(VendingMachine, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    count = models.SmallIntegerField(default=0)
