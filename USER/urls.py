from django.urls import path,include
from .views import *


urlpatterns = [
    path('register/',Register_User),
    path('login/', Login.as_view()),
    path('complete-register/', Complete_Register),
    path('user-info/', User_Information)
]