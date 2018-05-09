from django.urls import path

from . import views

urlpatterns = [
    path('Auth', views.login_authentication),
    path('Register', views.register_user),
    path('Token', views.secret_token)
]