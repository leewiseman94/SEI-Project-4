from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from datetime import datetime, timedelta

User = get_user_model()

class RegisterView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=422)



class LoginView(APIView):
    permission_classes = (AllowAny,)

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.id, 'exp': datetime.now() + timedelta(days=2) }, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})


class FindUserView(APIView):

    permission_classes = (AllowAny,)

    def get(self, request, pk):
        try:
            user = User.objects.get(id=pk)
            serialized_user = UserSerializer(user)
            print(user)
            return Response(serialized_user.data, status=HTTP_200_OK)
        except:
            return Response(status=HTTP_404_NOT_FOUND)


    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):
        print('****** Hello', request)
        email = request.data.get('email')
        user = self.get_user(email)
        return Response({'message': 'User Found'})