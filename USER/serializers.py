from rest_framework import serializers
from .models import Data_User,Ticket


class Ticket_Serializer(serializers.ModelSerializer):
    class Meta:
        model= Ticket
        fields = ['code']

class Data_User_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Data_User
        fields = '__all__'


