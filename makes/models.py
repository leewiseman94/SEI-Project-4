from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Make(models.Model):
    name = models.CharField(max_length=100, default=None, null=False, blank=False)


    def __str__(self):
        return f"{self.name}"


