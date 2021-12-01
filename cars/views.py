from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.http.response import HttpResponse
from django.shortcuts import render
from .models import Car
from .serializers import CarSerializer

def home(request):
    list_of_cars = Car.objects.all()
    return HttpResponse('<h1>Hello World</h1>')

class CarListView(APIView):

    def get(self, _request):
        # Get all cars from the database
        cars = Car.objects.all()
        print('Cars ->', cars)  # Returns a queryset needs to be converted - need to serialize the response into Python
        serialized_cars = CarSerializer(cars, many=True)
        print('Serialized Cars ->', serialized_cars.data)

        return Response(serialized_cars.data, status=status.HTTP_200_OK)

    def post(self, request):
        car = CarSerializer(data = request.data)
        if car.is_valid():
            car.save()
            return Response(car.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(car.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class CarDetailView(APIView):

    def put(self, request, pk):
        car = Car.objects.get(id=pk)
        updated_car = CarSerializer(car, data=request.data)
        if updated_car.is_valid():
            updated_car.save()
            return Response(updated_car.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_car.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    def delete(self, request, pk):
        try:
            car = Car.objects.get(id=pk)
            car.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def get(self, request, pk):
        try:
            car = Car.objects.get(id=pk)
            serialized_car = CarSerializer(car)
            return Response(serialized_car.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)