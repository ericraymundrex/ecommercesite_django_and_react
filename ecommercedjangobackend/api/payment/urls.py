from django.urls import path,include
from . import views
from rest_framework import routers


urlpatterns = [
    path('gettoken/<str:id>/<str:token>/',views.generate_token,name="token.generate"),
    path('process/<str:id>/<str:token>/',views.process_payment,name="process.payment"),
]