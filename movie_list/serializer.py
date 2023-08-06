from rest_framework import serializers
from django.contrib.auth.models import User
from .models import PrivateDetails, PublicDetails


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validate_data):
        user = User.objects.create_user(**validate_data)
        return User


class PrivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivateDetails
        fields = "__all__"

    def create(self, validated_data):
        return super().create(validated_data)


class PublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicDetails
        fields = "__all__"

    def create(self, validated_data):
        return super().create(validated_data)
