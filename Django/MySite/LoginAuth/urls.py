from django.urls import path

from . import views

urlpatterns = [
    path('Auth', views.loginAuthentication, name='loginAuthentication'),
    path('Register', views.registerUser, name='registerUser')
]