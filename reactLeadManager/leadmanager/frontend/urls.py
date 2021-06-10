from django.urls import path
from . import views

urlpatterns = [
  # Based on the index method created in views.py
  path('', views.index)
]