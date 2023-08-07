from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
import requests
from rest_framework.response import Response
from rest_framework import status
import json
from .serializer import UserSerializer
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated
from .serializer import PrivateSerializer, PublicSerializer
from .models import PrivateDetails, PublicDetails
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

# index = never_cache(TemplateView.as_view(template_name="index.html"))


def index(request):
    return render(request, "index.html")


@api_view(["GET", "POST"])
def omdb_proxy(request):
    try:
        api_key = "ab25bda2"
        page = request.GET.get("page")
        api_url = f"http://www.omdbapi.com/?apikey={api_key}&s=world War&page={page}"
        response = requests.get(api_url)
        data = response.json()
        return Response(data)
    except Exception as e:
        print("Error fetching data", e)
        return Response(
            {"error": "Internal Server Error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
def serach_OMDB(request):
    try:
        data = request.data
        api_key = "ab25bda2"
        search = request.GET.get("s")
        page = request.GET.get("page")
        api_url = f"http://www.omdbapi.com/?apikey={api_key}&s={search}&page={page}"
        response = requests.get(api_url)
        data = response.json()
        return Response(data)
    except Exception as e:
        return Response(
            {"Unable to fetch the data": "Internal server Error {e}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET", "POST"])
def store_user_data(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"Success": "Account created Successfully, Continue to login"},
            status=status.HTTP_200_OK,
        )
    return Response(serializer.errors, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET", "POST"])
def login_view(request):
    if request.method == "POST":
        data = request.data
        username = data.get("username")
        password = data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response(
                {
                    "Success": "Successfully login",
                    "userId": user.id,
                    "sessionKey": request.session.session_key,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                request, {"error": "Invalid User"}, status=status.HTTP_401_UNAUTHORIZED
            )
    return Response(
        {"message": "method not allowed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def valided_token(request):
    return Response({"message": "Token is valid"}, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def private_playlist(request):
    if request.method == "POST":
        data = request.data.copy()
        data["user"] = request.user.id
        serializer = PrivateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": "the data has been saved in the Private list"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"failed": "The data is invalid"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
        )
    elif request.method == "GET":
        private_list = PrivateDetails.objects.filter(user=request.user)
        serializer = PrivateSerializer(private_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def public_playlist(request):
    if request.method == "POST":
        data = request.data.copy()
        data["user"] = request.user.id
        serializer = PublicSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": "the data has been saved in public List"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"failed": "The data is invalid"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
        )
    elif request.method == "GET":
        public_list = PublicDetails.objects.filter(user=request.user)
        serializer = PublicSerializer(public_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET", "DELETE"])
def remove_private_data(request, id):
    if request.method == "DELETE":  # Check if the request method is DELETE
        instance = get_object_or_404(PrivateDetails, id=id)
        instance.delete()
        return Response(
            {"success": "data deleted successfully"}, status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
        )


@api_view(["GET", "DELETE"])
def remove_public_data(request, id):
    if request.method == "DELETE":  # Check if the request method is DELETE
        instance = get_object_or_404(PublicDetails, id=id)
        instance.delete()
        return Response(
            {"success": "data deleted successfully"}, status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"error": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED
        )


@api_view(["GET"])
def get_all_public_data(request):
    if request.method == "GET":
        public_list = PublicDetails.objects.all().order_by("-id")
        serializer_data = []
        for public_obj in public_list:
            data = {
                "user": public_obj.user.username,
                "imdb": public_obj.imdb,
                "Title": public_obj.Title,
                "Poster": public_obj.Poster,
                "id": public_obj.id,
                "Type": public_obj.Type,
                "Year": public_obj.Year,
            }
            serializer_data.append(data)
        return Response(serializer_data, status=status.HTTP_200_OK)
