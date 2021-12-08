import re
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django.http.response import HttpResponse
from django.shortcuts import render
from .models import Car, BODY_TYPE_CHOICES, FUEL_TYPE_CHOICES, GEAR_BOX_CHOICES, DOORS_CHOICES, SEATS_CHOICES
from .serializers import CarDetailsSerializer, CarSerializer, PopulatedCarSerializer
import requests

def home(request):
    list_of_cars = Car.objects.all()
    return HttpResponse('<h1>Hello World</h1>')

class CarListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        # Get all cars from the database
        cars = Car.objects.all()
        serialized_cars = PopulatedCarSerializer(cars, many=True)

        return Response(serialized_cars.data, status=status.HTTP_200_OK)

    def post(self, request):

        car = CarSerializer(data = request.data)
        if car.is_valid():
            car.save()
            return Response(car.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(car.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class CarDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

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
            serialized_car = PopulatedCarSerializer(car)
            return Response(serialized_car.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CarChoiceOptionsView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        # Get all cars from the database
        choices = ("bodyTypeOptions", BODY_TYPE_CHOICES), ("fuelTypeOptions", FUEL_TYPE_CHOICES), ("gearboxOptions", GEAR_BOX_CHOICES), ("doorOptions", DOORS_CHOICES), ("seatOptions", SEATS_CHOICES)
        print(choices)


        return Response(choices, status=status.HTTP_200_OK)


class GetCarDetailsView(APIView):
    def post(self, request):

        try:
            response_data = request.data
            registation = response_data["registrationNumber"]
            url = "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles"
            payload = "{" + f"\n\t\"registrationNumber\":\"{registation}\"\n" + "}"
            headers = {
              'x-api-key': 'xIl66U3M651rTOA0ku9sK9WmDw1Yr2cw2YNr5Ikd',
              'Content-Type': 'application/json'
            }
            response = requests.request("POST", url, headers=headers, data = payload)
            return Response(response.json())
        except:
            Response(status=status.HTTP_404_NOT_FOUND)
