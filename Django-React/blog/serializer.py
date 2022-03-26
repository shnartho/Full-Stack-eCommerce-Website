from rest_framework import serializers
from .models import Post


class PostSerilizers(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ['user']
        
    def validate(self,obj):
        obj['user'] = self.context['request'].user
        return obj