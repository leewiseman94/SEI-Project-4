from django.urls import path
from . import views
from .views import CarListView, CarDetailView

urlpatterns = [
    path('home/', views.home),
    path('', CarListView.as_view()), # Requests coming into /Listings
    path('<int:pk>/', CarDetailView.as_view())
]