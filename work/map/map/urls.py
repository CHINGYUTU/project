from django.contrib import admin
from django.urls import path
from mapapp.views import map

urlpatterns = [
    path('admin/', admin.site.urls),
    path('map',map),
]
