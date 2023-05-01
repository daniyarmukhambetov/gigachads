from django.urls import path, include
from rest_framework import routers

from .views import *

urlpatterns = [
    path('by_time/', EventByTimeViewSet.as_view())
]