from django.db import models
import uuid


class VendingMachine(models.Model):
    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    location = models.TextField(blank=True)

    coin_1 = models.PositiveIntegerField(default=0)
    coin_5 = models.PositiveIntegerField(default=0)
    coin_10 = models.PositiveIntegerField(default=0)
    banknote_20 = models.PositiveIntegerField(default=0)
    banknote_50 = models.PositiveIntegerField(default=0)
    banknote_100 = models.PositiveIntegerField(default=0)
    banknote_500 = models.PositiveIntegerField(default=0)
    banknote_1000 = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

