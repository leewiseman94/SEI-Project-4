from rest_framework import serializers
from .models import Sale
from cars.serializers import CarSerializer
from jwt_auth.serializers import UserSerializer


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'


class PopulatedSaleSerializer(SaleSerializer):
    car = CarSerializer(read_only=True, many=False)
    seller = UserSerializer(read_only=True, many=False)
    buyer = UserSerializer(read_only=True, many=False)