from django.db import models
from USER.models import Data_User

# Create your models here.

class Data_Bonus_Aktiv(models.Model):
    user = models.OneToOneField(Data_User, on_delete=models.CASCADE)
    bonus_sponsor = models.FloatField(default=0)
    bonus_pairing = models.FloatField(default=0)
    bonus_total = models.FloatField(default=0)

    def __str__(self):
        return "{}  sponsor: {} | pairing: {}".format(self.user, self.bonus_sponsor, self.bonus_pairing)

class Data_Bonus_Pasiv(models.Model):
    user= models.OneToOneField(Data_User, on_delete=models.CASCADE)
    roi = models.FloatField(default=0)

    def __str__(self):
        return "{} roi : {}".format(self.user, self.roi)
