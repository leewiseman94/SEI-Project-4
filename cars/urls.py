from django.urls import path
from . import views
from .views import CarListView, CarDetailView, CarChoiceOptionsView, GetCarDetailsView

urlpatterns = [
    path('', CarListView.as_view()),
    path('<int:pk>/', CarDetailView.as_view()),
    path('choices/', CarChoiceOptionsView.as_view()),
    path('details/', GetCarDetailsView.as_view()),
]