from django.db.models.signals import post_save
from .models import Data_User,Data_Money
from BONUS.models import Data_Bonus_Aktiv, Data_Bonus_Pasiv
from django.contrib.auth.models import User

#third party
from rest_framework.authtoken.models import Token


def create_user(sender, instance,created,**kwargs):
    if created:
        Data_Money.objects.create(user=instance)
        Data_Bonus_Aktiv.objects.create(user=instance)
        Data_Bonus_Pasiv.objects.create(user=instance)

post_save.connect(create_user,sender=Data_User)


def create_user_token(sender, instance,created,**kwargs):
    if created:
        Token.objects.create(user=instance)

post_save.connect(create_user_token,sender=User)













