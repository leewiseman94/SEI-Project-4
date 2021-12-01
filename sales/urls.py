from django.urls import path
from . import views
from .views import SaleListView, SaleDetailView

urlpatterns = [
    path('', SaleListView.as_view()), # Requests coming into /Listings
    path('<int:pk>/', SaleDetailView.as_view())
    
]