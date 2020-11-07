from django.db import models
from django.contrib.auth.models import User
from mptt.models import MPTTModel, TreeForeignKey
from django.utils.crypto import get_random_string


# Create your models here.

class Role(models.Model):
    role = models.CharField(max_length=30)

    def __str__(self):
        return "{}".format(self.role)

class Data_User(MPTTModel):
    user_rel = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length= 50, null=True)
    phone = models.CharField(max_length=15, unique=True, null=True)
    email = models.EmailField(unique=True, null=True)
    city =  models.CharField(max_length=50, null=True)
    invest_value= models.FloatField(null=True,blank=True, default=0)
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True, blank=True, default=1)
    ticket_code = models.ForeignKey('Ticket', on_delete=models.CASCADE, null=True, blank=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE,
                            null=True, blank=True, related_name='children')
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return "{}".format(self.name)
    

class Ticket(models.Model):
    user= models.ForeignKey(Data_User, on_delete=models.CASCADE, null=True, blank=True)
    code = models.CharField(max_length=8, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return "{} {}".format(self.user, self.code)

    def save(self, *args, **kwargs):
        self.code = get_random_string(length=8).upper()

        super(Ticket, self).save()

class Data_Money(models.Model):
    user = models.OneToOneField(Data_User, on_delete=models.CASCADE)
    token = models.FloatField(default=0)
    poin = models.FloatField(default=0)
    
    def __str__(self):
        return "{} : {} | {} ".format(self.user, self.token, self.poin)
    



