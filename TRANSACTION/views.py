from USER.models import Data_User
from .serializers import *

#third party
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes,authentication_classes


@api_view(['POST'])
def Invest(request):
    user = request.user.data_user
    serializer = Invest_Serializer(data=request.data)
    value = float(request.data['value'])/2

    if user.data_money.poin - value < 0 and user.data_money.token - value < 0 and value != 0:
        return Response({'message':'Poin atau Token anda tidak mencukupi'}, status=status.HTTP_400_BAD_REQUEST)

    if serializer.is_valid():
        serializer.save(user=user)
        return Response({'message':'Invest Sukses'},status=status.HTTP_201_CREATED)
    return Response(serializer.errors)


