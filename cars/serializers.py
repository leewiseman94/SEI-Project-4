from rest_framework import serializers
from .models import Car
# from sales.serializers import SaleSerializer


class CarSerializer(serializers.ModelSerializer):
    # sales = serializers.StringRelatedField(many=True)

    class Meta:
        model = Car
        fields = '__all__'


# class PopulatedCarSerializer(CarSerializer):
#     class Meta:
#         model = Car
#         fields = '__all__'

#     car = SaleSerializer(read_only=True, many=True)