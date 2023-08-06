from django.contrib import admin
from .models import PrivateDetails
from .models import PublicDetails

admin.register(PrivateDetails)
admin.register(PublicDetails)
