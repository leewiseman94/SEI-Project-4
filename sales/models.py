from django.db import models

# Create your models here.

class Sale(models.Model):
    listedDate = models.DateField(auto_now_add=True, null=False, blank=False)
    saleStatus = models.CharField(max_length=100, null=False, blank=False)
    completedSaleDate = models.DateField(null=True, blank=True)
    car = models.ForeignKey("cars.Car", on_delete=models.CASCADE)


    # def __str__(self):
    #     return f"{self.id}"
