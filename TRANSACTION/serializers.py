from rest_framework import serializers
from .models import *

class Invest_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Invest
        fields = '__all__'