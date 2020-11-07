from django.shortcuts import render

from .models import *
from .serializers import *
from django.contrib.auth.models import User

#Third Party
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes,authentication_classes



class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(Login, self).post(request, *args, **kwargs)
        #get token and data from login
        token = Token.objects.get(key=response.data['token'])
        user = token.user.data_user
        return Response({'token': token.key,
                         'username': user.user_rel.username,
                         'name': user.name,
                         'phone': user.phone,
                         'email': user.email,
                         'city': user.city,
                         'role': user.role.role,
                        })

@api_view(['POST'])
@permission_classes([])
@authentication_classes([])
def Register_User(request):
    serializer = Data_User_Serializer(data=request.data)
    code = request.data['code']
    username = request.data['username'].upper()
    email= request.data['email']
    password = request.data['password']

    #validating ticket
    if Ticket.objects.filter(code=code).exists() == False or Data_User.objects.filter(ticket_code__code=code).exists():
        return Response({'message':'Ticket Invalid'}, status=status.HTTP_404_NOT_FOUND)
    ticket = Ticket.objects.get(code=code)

    #validating user
    if User.objects.filter(username=username).exists():
        return Response({'message':'Username Sudah Terdaftar'},status=status.HTTP_400_BAD_REQUEST)

    #validating email
    if Data_User.objects.filter(email=email).exists():
        return Response({'message':'Email Sudah Terdaftar'},status=status.HTTP_400_BAD_REQUEST)


    if serializer.is_valid():
        User.objects.create_user(username=username, password=password, email=email)
        user = User.objects.get(username=username)
        serializer.save(ticket_code=ticket, user_rel=user)
        return Response({'message':'Registrasi Berhasil'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def Complete_Register(request):
    user = request.user.data_user
    serializer = Data_User_Serializer(instance=user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message':'Berhasil Melengkapi Data!'})
    return Response(serializer.errors)

@api_view(['GET'])
def User_Information(request):
    user = request.user.data_user
    used_ticket = Data_User.objects.filter(ticket_code__user=user).values_list('ticket_code__code')
    data_ticket = Ticket.objects.filter(user=user).exclude(code__in=used_ticket)
    ticket_serializer = Ticket_Serializer(data_ticket, many=True)
    data = {
            'invest_value': user.invest_value,
            'upline': user.parent.user_rel.username,
            'poin': user.data_money.poin,
            'token': user.data_money.token,
            'ticket': ticket_serializer.data
    }

    return Response(data)
































