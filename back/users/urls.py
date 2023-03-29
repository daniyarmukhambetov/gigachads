from django.urls import path
from django.conf import settings
from . import views

app_name = 'users'

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
]