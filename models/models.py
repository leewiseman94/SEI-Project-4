from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Model(models.Model):
    name = models.CharField(max_length=100, default=None, null=False, blank=False)
    make = models.ForeignKey("makes.Make", on_delete=models.CASCADE)
    image = models.CharField(max_length=500, default=None, null=True, blank=True)
    minUsedPrice = models.IntegerField(default=None, null=True, blank=True)
    maxUsedPrice = models.IntegerField(default=None, null=True, blank=True)


    def __str__(self):
        return f"{self.make} {self.name}"


