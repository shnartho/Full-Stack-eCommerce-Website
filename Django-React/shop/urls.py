from unicodedata import name
from django.urls import path
from .views import * 

urlpatterns = [
    path("product/",ProductView.as_view(),name="product"),
    path("product/<int:id>/",ProductView.as_view(),name="produc")
]
