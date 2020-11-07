from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Transaction)
admin.site.register(Invest)
admin.site.register(Bonus_Invest)
admin.site.register(Capping_Invest)


