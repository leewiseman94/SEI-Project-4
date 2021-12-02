from django.urls import path
from . import views
from .views import MakeListView, MakeDetailView

urlpatterns = [
    path('', MakeListView.as_view()),
    path('<int:pk>/', MakeDetailView.as_view())
]