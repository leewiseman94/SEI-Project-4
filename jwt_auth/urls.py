from django.urls import path
from .views import RegisterView, LoginView, FindUserView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('find/<int:pk>/', FindUserView.as_view()),
]