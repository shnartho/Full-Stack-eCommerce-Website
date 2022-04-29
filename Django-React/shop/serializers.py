from distutils import dep_util
from attr import field
from rest_framework import serializers
from .models import *


class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        depth = 1        

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        