from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django.http.response import HttpResponse
from django.shortcuts import render
from .models import Sale
from .serializers import SaleSerializer, PopulatedSaleSerializer

def home(request):
    list_of_sales = Sale.objects.all()
    return HttpResponse('<h1>Hello World</h1>')

class SaleListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        # Get all sales from the database
        sales = Sale.objects.all()
        print('Sales ->', sales)  # Returns a queryset needs to be converted - need to serialize the response into Python
        serialized_sales = PopulatedSaleSerializer(sales, many=True)
        print('Serialized Sales ->', serialized_sales.data)

        return Response(serialized_sales.data, status=status.HTTP_200_OK)

    def post(self, request):
        sale = SaleSerializer(data = request.data)
        if sale.is_valid():
            sale.save()
            return Response(sale.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(sale.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class SaleDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def put(self, request, pk):
        sale = Sale.objects.get(id=pk)
        updated_sale = SaleSerializer(sale, data=request.data)
        print("****", updated_sale)
        if updated_sale.is_valid():
            updated_sale.save()
            return Response(updated_sale.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_sale.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    def delete(self, request, pk):
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def get(self, request, pk):
        try:
            sale = Sale.objects.get(id=pk)
            serialized_sale = PopulatedSaleSerializer(sale)
            return Response(serialized_sale.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)