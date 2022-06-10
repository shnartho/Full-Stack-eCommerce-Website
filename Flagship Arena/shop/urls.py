from django.urls import path,include
from rest_framework import routers

from .views import *

router = routers.DefaultRouter()
router.register('cart',MyCart,basename="MyCart")
router.register('orders',OrderViewset,basename="OrderViewset")
router.register('category',CatagoryViewset,basename="CatagoryViewset")

urlpatterns = [
    path("",include(router.urls)),
    path("profile/",ProfileView.as_view(),name="profile"),
    path("register/",RegisterView.as_view(),name="register"),
    path("product/",ProductView.as_view(),name="product"),
    path("product/<int:id>/",ProductView.as_view(),name="productdetal"),
    path("addtocart/",AddtoCartView.as_view(),name="addtocart"),
    path("updatecartproduct/",UpdateCartProduct.as_view(),name="updatecartproduct"),
    path("editcartproduct/",EditCartProduct.as_view(),name="editcartproduct"),
    path("delatecartproduct/",Delatecartproduct.as_view(),name="delatecartproduct"),
    path("delatefullcart/",Delatefullcart.as_view(),name="delatefullcart"),
    path("updateuser/",Updateuser.as_view(),name="updateuser"),
    path("updateprofile/",Updateprofile.as_view(),name="updateprofile"),
]
