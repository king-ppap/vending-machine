from django.db import models
import uuid
from stock.models import Product


class VendingMachine(models.Model):
    code = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    location = models.TextField(blank=True)

    coin_1 = models.PositiveIntegerField(default=0)
    coin_5 = models.PositiveIntegerField(default=0)
    coin_10 = models.PositiveIntegerField(default=0)
    banknotes_20 = models.PositiveIntegerField(default=0)
    banknotes_50 = models.PositiveIntegerField(default=0)
    banknotes_100 = models.PositiveIntegerField(default=0)
    banknotes_500 = models.PositiveIntegerField(default=0)
    banknotes_1000 = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name


class ItemsInMachine(models.Model):
    machine = models.ForeignKey(VendingMachine, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    count = models.SmallIntegerField(default=0)
