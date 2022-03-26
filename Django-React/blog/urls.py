from django.urls import path, include
from rest_framework import routers
from .views import PistViewset

route = routers.DefaultRouter()
route.register("post",PistViewset,basename="PistViewset")

urlpatterns = [
    path('',include(route.urls))
]
