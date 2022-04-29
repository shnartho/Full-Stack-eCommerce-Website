from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import views,viewsets,generics,mixins
from .models import *
from .serializers import *

class ProductView(generics.GenericAPIView,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by("-id")
    serializer_class= ProductSerializers
    lookup_field = "id"

    def get(self,request,id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

class CategoryView(viewsets.ViewSet):
    def list(self, request):
        query = Category.objects.all().order_by("-id")
        serializers = CategorySerializer(query, many=True)
        return Response(serializers.data)

    def retrieve(self, request, pk=None):
        query = Category.objects.get(id=pk)
        serializers = CategorySerializer(query)
        serializers_data = serializers.data
        all_data = []
        category_products = Product.objects.filter(category_id =serializers.data['id'])
        category_products_serializer = ProductSerializers(category_products,many = True)
        serializers_data["category_products"] = category_products_serializer.data
        all_data.append(serializers_data)
        return Response(all_data)
    



