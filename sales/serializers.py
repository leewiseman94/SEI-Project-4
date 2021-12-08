from makes.serializers import MakeSerializer
from rest_framework import serializers
from .models import Sale
from cars.serializers import PopulatedCarSerializer
from jwt_auth.serializers import UserSerializer


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'


class PopulatedSaleSerializer(SaleSerializer):
    car = PopulatedCarSerializer(read_only=True, many=False)
    seller = UserSerializer(read_only=True, many=False)
    buyer = UserSerializer(read_only=True, many=False)
    make = MakeSerializer(read_only=True, many=False)