from django.contrib import admin
from django.urls import path
from mapapp.views import index,map

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index',index),
    path('map',map),
]
