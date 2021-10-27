from django.db import models
from django.utils import timezone


# Create your models here.

class Mnames(models.Model):
    Address = models.CharField(max_length=250, unique=True)
    IP = models.CharField(max_length=100)
    Port = models.IntegerField() 
    objects= models.Manager()
    
    def __str__(self):
        return self.Address



class List(models.Model):
    Contract_Address = models.CharField(max_length=250, unique=True)
    Buyer_Address = models.CharField(max_length=250)
    Seller_Address = models.CharField(max_length=250)
    # Might take Foreign Key for Seller so Only He himself can Edit
    Amount = models.IntegerField()
    Time = models.DateTimeField(default=timezone.now)
    Completed = models.BooleanField(default=False)
    objects= models.Manager()


    def __str__(self):
        return self.Contract_Address
    class Meta:
        ordering = ['Completed']

