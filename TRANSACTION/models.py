from django.db import models
from USER.models import Data_User
import uuid
# Create your models here.

class Transaction(models.Model):
    sender = models.ForeignKey(Data_User, on_delete=models.CASCADE, related_name='sender')
    value = models.FloatField()
    receiver = models.ForeignKey(Data_User, on_delete=models.CASCADE, related_name='receiver')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.sender)

class Invest(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    user = models.ForeignKey(Data_User, on_delete=models.CASCADE, null=True)
    value = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.user)

class Bonus_Invest(models.Model):
    invest = models.OneToOneField(Invest, on_delete=models.CASCADE, null=True)
    bonus = models.FloatField(null=True)

    def __str__(self):
        return "{}".format(self.invest.user)

class Capping_Invest(models.Model):
    invest = models.OneToOneField(Invest, on_delete=models.CASCADE, null=True)
    capping = models.FloatField(null=True)

    def __str__(self):
        return "{}".format(self.capping)

