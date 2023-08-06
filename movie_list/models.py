from django.db import models
from django.contrib.auth.models import User


class PrivateDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    imdb = models.CharField(max_length=10)
    Title = models.CharField(max_length=1000)
    Poster = models.URLField(max_length=500)
    Year = models.IntegerField()
    Type = models.CharField(max_length=10)

    class Meta:
        unique_together = ("user","imdb")


class PublicDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    imdb = models.CharField(max_length=10)
    Title = models.CharField(max_length=1000)
    Poster = models.URLField(max_length=500)
    Year = models.IntegerField()
    Type = models.CharField(max_length=10)

    class Meta:
        unique_together = ("user","imdb")