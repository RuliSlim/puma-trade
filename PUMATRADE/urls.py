from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/',include('USER.urls')),
    path('transaction/', include('TRANSACTION.urls')),

]
