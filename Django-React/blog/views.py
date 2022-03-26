from rest_framework import viewsets
from .models import Post
from .serializer import PostSerilizers
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

class PistViewset(viewsets.ModelViewSet):
    authentication_classes=[TokenAuthentication, ]
    permission_classes=[IsAuthenticated, ]
    queryset = Post.objects.all()
    serializer_class = PostSerilizers
