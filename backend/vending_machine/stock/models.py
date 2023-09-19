from django.db import models


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
