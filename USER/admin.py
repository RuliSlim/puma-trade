from django.contrib import admin
from .models import *
from mptt.admin import DraggableMPTTAdmin

admin.site.register(Data_User,DraggableMPTTAdmin)
admin.site.register(Ticket)
admin.site.register(Role)
admin.site.register(Data_Money)



