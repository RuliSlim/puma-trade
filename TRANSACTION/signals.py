from django.db.models.signals import post_save
from USER.models import Data_User
from .models import Invest,Bonus_Invest, Capping_Invest


def Invest_Signals(sender, instance,created,**kwargs):
    if created:
        user = instance.user
        money = user.data_money
        value = instance.value/2

        bonus = (value * 2) * 0.3

        money.token -= value

        Bonus_Invest.objects.create(invest=instance,bonus=bonus)

        capping = (instance.value * 3) - bonus
        Capping_Invest.objects.create(invest=instance, capping=capping)

        money.poin += (bonus - value)
        money.save()


        user.invest_value += instance.value
        user.save()

post_save.connect(Invest_Signals, sender=Invest)