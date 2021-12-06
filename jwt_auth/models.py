from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50, null=False, blank=False)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    surname = models.CharField(max_length=50, null=False, blank=False)
    address = models.CharField(max_length=100, default=None, null=True)
    city = models.CharField(max_length=100, default=None, null=True)
    county = models.CharField(max_length=100, default=None, null=True)
    post_code = models.CharField(max_length=100, default=None, null=True)
