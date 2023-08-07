from django.contrib import admin
from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("", views.index, name="index"),
    path("data/", views.omdb_proxy),
    path("search/", views.serach_OMDB),
    path("create_user/", views.store_user_data),
    path("login/", obtain_auth_token, name="login_view"),
    path("validate/", views.valided_token),
    path("create_private/", views.private_playlist),
    path("create_public/", views.public_playlist),
    path("deletePrivateItem/<str:id>/", views.remove_private_data),
    path("deletePublicItem/<str:id>/", views.remove_public_data),
    path("getallpublicdata/", views.get_all_public_data),
]
