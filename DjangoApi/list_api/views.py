from os import error
from django.db.models import query
from django.http.response import Http404
from django.shortcuts import render
from rest_framework import generics, serializers
from rest_framework.fields import CharField
from rest_framework.response import Response
from rest_framework.views import APIView
from list.models import List, Mnames
from .serializers import MSerializer, ListSerializer
from .connections import SendEnergy, Getinfo

# Create your views here.
class MListCreate(generics.CreateAPIView):
    queryset = Mnames.objects.all()
    serializer_class = MSerializer
    pass

class MList(APIView):
    def post(self,request):
        Address = request.data['Address']
        address = Mnames.objects.filter(Address=Address).first()
        serializer = MSerializer(address)
        if address is None:
            return Response("No Connections")
        # Insert the Get Info Code here
        Energy = Getinfo(serializer.data)
        return Response(Energy)

class BidList(generics.ListCreateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    pass

class Update(generics.RetrieveUpdateAPIView):
    lookup_field = "Contract_Address"
    queryset = List.objects.all()
    serializer_class = ListSerializer
    pass

class Fulfil(APIView):
    def post(self,request):
        Contract_Address = request.data['Contract_Address']
        contract = List.objects.filter(Contract_Address=Contract_Address).first()
        serializer = ListSerializer(contract)
        send = Mnames.objects.filter(Address=serializer.data['Seller_Address']).first()
        Send = MSerializer(send)
        receive = Mnames.objects.filter(Address=serializer.data['Buyer_Address']).first()
        Receive = MSerializer(receive)
        # Insert Send, Receive Code here
        status = SendEnergy(Receive.data, Send.data, serializer.data)
        List.objects.filter(Contract_Address = Contract_Address).update(Completed = True)
        return Response(status)

    




