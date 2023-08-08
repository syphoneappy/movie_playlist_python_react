"""
Django settings for movie_playlist_backend_app project.

Generated by 'django-admin startproject' using Django 4.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os
from urllib.parse import urlparse
from django.core.management.utils import get_random_secret_key
import sys


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = "django-insecure-$co-ar&sr&k633&aho$+waib+hzes0b8wvq8)#&g#4lp_s9gcg"
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", get_random_secret_key())
# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True
DEBUG = os.getenv("DEBUG", "False") == "True"
ALLOWED_HOSTS = [
    "http://127.0.0.1:8000",
    "127.0.0.1:8000",
    "https://shark-app-teuhd.ondigitalocean.app",
    "http://shark-app-teuhd.ondigitalocean.app",
    "shark-app-teuhd.ondigitalocean.app"
]
# ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "127.0.0.1, localhost").split(",")

# CORS_ALLOW_ALL_ORIGINS = True


STATIC_URL = "static/"
MEDIA_URL = "media/"

STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_DIRS = [
    # os.path.join(BASE_DIR, "staticfiles"),
    os.path.join(BASE_DIR, "movie-playlist-app/dist", "assets")
]

MEDIA_ROOT = os.path.join(BASE_DIR, "media")


INSTALLED_APPS = [
    "debug_toolbar",
    "whitenoise.runserver_nostatic",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "movie_list",
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

ROOT_URLCONF = "movie_playlist_backend_app.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "movie-playlist-app/dist")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
TEMPLATE_LOADERS = [
    ("django.template.loaders.filesystem.Loader", [os.path.join(BASE_DIR, "static")]),
    ("django.template.loaders.filesystem.Loader", [os.path.join(BASE_DIR, "js")]),
]
WSGI_APPLICATION = "movie_playlist_backend_app.wsgi.application"

STATICFILES_MIMETYPES = {
    ".css": "text/css",
}

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ],
}

CORS_ALLOWED_ORIGINS = ["http://localhost:5173","shark-app-teuhd.ondigitalocean.app"]

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

SESSION_ENGINE = "django.contrib.sessions.backends.db"
# DEVELOPMENT_MODE = os.getenv("DEVELOPMENT_MODE", "False") == "True"

# if DEVELOPMENT_MODE is True:
#     DATABASES = {
#         "default": {
#             "ENGINE": "django.db.backends.postgresql",
#             "NAME": "cdotdb",
#             "USER": "postgres",
#             "PASSWORD": "1234",
#             "HOST": "localhost",
#         }
#     }
# elif len(sys.argv) > 0 and sys.argv[1] != "collectstatic":
#     if os.getenv("DATABASE_URL", None) is None:
#         raise Exception("DATABASE_URL environment variable not defined")
#     DATABASES = {
#         "default": dj_database_url.parse(os.environ.get("DATABASE_URL")),
#     }
# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
