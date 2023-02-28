from django.urls import path
from . import views

urlpatterns = [
    path("chat-tiktoks", views.index, name="tiktoks"),
]
