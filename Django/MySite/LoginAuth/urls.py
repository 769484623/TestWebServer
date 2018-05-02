from django.urls import path

from . import views

urlpatterns = [
    path('Auth', views.loginAuthentication, name='loginAuthentication'),
]