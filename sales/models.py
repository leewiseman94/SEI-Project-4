from django.db import models

# Create your models here.

class Sale(models.Model):
    listedDate = models.DateField(auto_now_add=True, null=False, blank=False)
    saleStatus = models.CharField(max_length=100)
    completedSaleDate = models.DateField(null=True, blank=True)
    car = models.ForeignKey("cars.Car", on_delete=models.CASCADE)
    seller = models.ForeignKey("jwt_auth.User",related_name='seller' , on_delete=models.CASCADE)
    buyer = models.ForeignKey("jwt_auth.User", related_name='buyer', on_delete=models.CASCADE, null=True, blank=True)



    # def __str__(self):
    #     return f"{self.id}"
