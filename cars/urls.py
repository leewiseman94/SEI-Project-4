from django.urls import path
from . import views
from .views import CarListView, CarDetailView, CarChoiceOptionsView

urlpatterns = [
    path('', CarListView.as_view()),
    path('<int:pk>/', CarDetailView.as_view()),
    path('choices/', CarChoiceOptionsView.as_view()),
]