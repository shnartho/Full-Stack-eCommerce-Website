from unicodedata import name
from django.urls import path, include
from rest_framework import routers
from .views import * 

route = routers.DefaultRouter()
route.register("category", CategoryView, basename= "CategoryView")
route.register("cart", Mycart, basename= "cart")

urlpatterns = [
    path("",include(route.urls)),
    path("product/",ProductView.as_view(),name="product"),
    path("product/<int:id>/",ProductView.as_view(),name="produc"),
    path('profile/', ProfileView.as_view(), name="profiel"),
    path('updateuser/',UserDataUpdate.as_view(), name= "userdataupdate"),
    path('profileimageupdate/', ProfileImageUpdate.as_view(), name="profileimageupdate")
]
