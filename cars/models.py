from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

BODY_TYPE_CHOICES = (("Hatchback", "Hatchback"), ("SUV", "SUV"), ("Estate", "Estate"), ("Saloon", "Saloon"), ("Coupe", "Coupe"), ("Convertible", "Convertible"), ("MVP", "MVP"))
FUEL_TYPE_CHOICES = (("Petrol", "Petrol"), ("Diesel", "Diesel"), ("Electric", "Electric"), ("Hybrid", "Hybrid"), ("Other", "Other"))
GEAR_BOX_CHOICES = (("Automatic", "Automatic"), ("Manual", "Manual"))
DOORS_CHOICES = ((2, "2 doors"), (3, "3 doors"), (4, "4 doors"), (5, "5 doors"))
SEATS_CHOICES = ((2, "2 seats"), (4, "4 seats"), (5, "5 seats"), (7, "7 seats"), (8, "8 seats"))

class Car(models.Model):
    dateAdded = models.DateField(auto_now_add=True, null=False, blank=False)
    make = models.ForeignKey("makes.Make", on_delete=models.CASCADE)
    model = models.ForeignKey("models.Model", on_delete=models.CASCADE)
    modelVariation = models.CharField(max_length=50, default=None, null=False, blank=False)
    images = ArrayField(models.CharField(max_length=500, default=None), default=None, null=False, blank=False)
    registrationNumber = models.CharField(max_length=8, default=None, unique=True)
    colour = models.CharField(max_length=20, default=None, null=False, blank=False)
    engineCapacity = models.IntegerField(default=None, null=True, blank=True)
    yearOfManufacture = models.IntegerField(default=None)
    # price = models.FloatField(default=None)
    bodyType = models.CharField(max_length=100, default=None, choices=BODY_TYPE_CHOICES)
    fuelType = models.CharField(max_length=100, default=None, choices=FUEL_TYPE_CHOICES)
    mileage = models.IntegerField(default=None)
    gearbox = models.CharField(max_length=100, default=None, choices=GEAR_BOX_CHOICES)
    doors = models.IntegerField(default=None, choices=DOORS_CHOICES)
    seats = models.IntegerField(default=None, choices=SEATS_CHOICES)


    def __str__(self):
        return f"{self.registrationNumber}"


