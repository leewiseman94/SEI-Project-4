from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django.http.response import HttpResponse
from django.shortcuts import render
from .models import Model
from .serializers import ModelSerializer

def home(request):
    list_of_models = Model.objects.all()
    return HttpResponse('<h1>Hello World</h1>')

class ModelListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        # Get all models from the database
        models = Model.objects.all()
        print('Models ->', models)  # Returns a queryset needs to be converted - need to serialize the response into Python
        serialized_models = ModelSerializer(models, many=True)
        print('Serialized Models ->', serialized_models.data)

        return Response(serialized_models.data, status=status.HTTP_200_OK)

    def post(self, request):
        model = ModelSerializer(data = request.data)
        if model.is_valid():
            model.save()
            return Response(model.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(model.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class ModelDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def put(self, request, pk):
        model = Model.objects.get(id=pk)
        updated_model = ModelSerializer(model, data=request.data)
        if updated_model.is_valid():
            updated_model.save()
            return Response(updated_model.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_model.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    def delete(self, request, pk):
        try:
            model = Model.objects.get(id=pk)
            model.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def get(self, request, pk):
        try:
            model = Model.objects.get(id=pk)
            serialized_model = ModelSerializer(model)
            return Response(serialized_model.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)