from rest_framework import serializers
from .models import Car
from makes.serializers import MakeSerializer
from models.serializers import ModelSerializer


class CarSerializer(serializers.ModelSerializer):
    # sales = serializers.StringRelatedField(many=True)

    class Meta:
        model = Car
        fields = '__all__'


class PopulatedCarSerializer(CarSerializer):
    make = MakeSerializer(read_only=True, many=False)
    model = ModelSerializer(read_only=True, many=False)


# class PopulatedCarSerializer(CarSerializer):
#     class Meta:
#         model = Car
#         fields = '__all__'

#     car = SaleSerializer(read_only=True, many=True)