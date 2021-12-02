from rest_framework import serializers
from .models import Make
# from sales.serializers import SaleSerializer


class MakeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Make
        fields = '__all__'

