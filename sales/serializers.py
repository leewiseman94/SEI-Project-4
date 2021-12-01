from rest_framework import serializers
from .models import Sale
from cars.serializers import CarSerializer


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'


class PopulatedSaleSerializer(SaleSerializer):
    car = CarSerializer(read_only=True, many=False)