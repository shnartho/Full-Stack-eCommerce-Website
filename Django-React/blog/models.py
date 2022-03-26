from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    user= models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="image/",blank=True, null=True)
    def __str__(self):
        return self.title
    