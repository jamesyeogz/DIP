from rest_framework import serializers
from list.models import List,Mnames 

class MSerializer(serializers.ModelSerializer):
    class Meta:
        model= Mnames
        fields=('id', 'Address', 'IP', 'Port')


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model= List
        fields=('id', 'Contract_Address', 'Buyer_Address', 'Seller_Address', 'Amount', 'Time', 'Completed')