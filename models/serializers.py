from rest_framework import serializers
from .models import Model
# from sales.serializers import SaleSerializer


class ModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Model
        fields = '__all__'

