from django.urls import path
from . import views
from .views import CarListView, CarDetailView

urlpatterns = [
    path('', CarListView.as_view()),
    path('<int:pk>/', CarDetailView.as_view())
]