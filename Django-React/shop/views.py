import profile
from urllib import response
from django.shortcuts import render
from httplib2 import Authentication
from rest_framework.response import Response
from rest_framework import views,viewsets,generics,mixins
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User

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
    
class ProfileView(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    def get(self, request):
        try:
            query = Profile.objects.get(prouser = request.user)
            serializers = ProfileSerializer(query)
            response_msg = {"error":False, "data":serializers.data}
        except:
            response_msg = {'error':True, "message":"Something is wrong"}
        return Response(response_msg) 

class UserDataUpdate(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    def post(self, request):
        try:
            user = request.user
            data = request.data

            user_obj = User.objects.get(username=user)
            user_obj.first_name = data["first_name"]
            user_obj.last_name = data["last_name"]
            user_obj.email = data["email"]
            user_obj.save()

            response_msg = {"error":False, "message":"User data is updated"}
            

        except:
            response_msg = {"error":True, "message":"User data is not updated"}


        return Response(response_msg)

class ProfileImageUpdate(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            user = request.user
            query = Profile.objects.get(prouser=user)
            data = request.data
            serializers = ProductSerializers(query, data=data, context={"request":request})
            serializers.is_valid(raise_exception=True)
            serializers.save()

            response_res = {"error":False, "message":"Profile image updated"}
        except:
            response_res = {"error":True, "message":"Profile image is not updated"}

        return Response(response_res)