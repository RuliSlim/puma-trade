from django.core.management.base import BaseCommand
from BONUS.models import *
from USER.models import Data_User
from TRANSACTION.models import *

class Command(BaseCommand):
    help = 'naboy ganteng'

    def handle(self, *args, **kwargs):
        capping = Capping_Invest.objects.filter(capping__gt=0).values_list('invest')
        invest = Invest.objects.filter(id__in=capping).values_list('user__user_rel__username')
        all_user = Data_User.objects.filter(user_rel__username__in=invest)
        roi_poin = 5/100
        for i in all_user:
            a = i.invest_set.all()
            for x in a:
                roi = (x.value * 3) * roi_poin

                print(roi, x.capping_invest)
