from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from django.http.response import HttpResponse
from django.shortcuts import render
from .models import Make
from .serializers import MakeSerializer

def home(request):
    list_of_makes = Make.objects.all()
    return HttpResponse('<h1>Hello World</h1>')

class MakeListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        # Get all makes from the database
        makes = Make.objects.all()
        print('Makes ->', makes)  # Returns a queryset needs to be converted - need to serialize the response into Python
        serialized_makes = MakeSerializer(makes, many=True)
        print('Serialized Makes ->', serialized_makes.data)

        return Response(serialized_makes.data, status=status.HTTP_200_OK)

    def post(self, request):
        make = MakeSerializer(data = request.data)
        if make.is_valid():
            make.save()
            return Response(make.data, status=status.HTTP_201_CREATED)
        else: 
            return Response(make.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class MakeDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def put(self, request, pk):
        make = Make.objects.get(id=pk)
        updated_make = MakeSerializer(make, data=request.data)
        if updated_make.is_valid():
            updated_make.save()
            return Response(updated_make.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_make.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    def delete(self, request, pk):
        try:
            make = Make.objects.get(id=pk)
            make.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def get(self, request, pk):
        try:
            make = Make.objects.get(id=pk)
            serialized_make = MakeSerializer(make)
            return Response(serialized_make.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)