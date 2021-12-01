from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Car(models.Model):
    dateAdded = models.DateField(auto_now_add=True, null=False, blank=False)
    make = models.CharField(max_length=100, default=None, null=False, blank=False)
    model = models.CharField(max_length=100, default=None, null=False, blank=False)
    images = ArrayField(models.CharField(max_length=500, default=None), default=None, null=False, blank=False)
    registrationNumber = models.CharField(max_length=8, default=None, null=False, blank=False)
    colour = models.CharField(max_length=50, default=None, null=False, blank=False)
    engineCapacity = models.IntegerField(default=None)
    yearOfManufacture = models.IntegerField(default=None)
    price = models.FloatField(default=None)
    bodyType = models.CharField(max_length=100, default=None)
    fuelType = models.CharField(max_length=100, default=None)
    mileage = models.IntegerField(default=None)
    gearBox = models.CharField(max_length=100, default=None)
    doors = models.IntegerField(default=None)
    seats = models.IntegerField(default=None)


    def __str__(self):
        return f"{self.registrationNumber}"


