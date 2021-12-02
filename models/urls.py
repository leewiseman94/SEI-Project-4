from django.urls import path
from . import views
from .views import ModelListView, ModelDetailView

urlpatterns = [
    path('', ModelListView.as_view()),
    path('<int:pk>/', ModelDetailView.as_view())
]