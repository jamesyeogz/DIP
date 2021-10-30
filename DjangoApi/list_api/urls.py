from django.urls import path
from .views import BidList, Fulfil, MList, MListCreate, Update

app_name='list_api'

urlpatterns=[
    path('Mname', MList.as_view(), name='MicroGridcheck'),
    path('Mname/create', MListCreate.as_view(), name='MicrogridCreate'),
    path('list/', BidList.as_view(), name='listcreate'),
    path('list/<str:Contract_Address>', Update.as_view(), name="UpdateList"),
    path('fulfill', Fulfil.as_view(), name="Fulfil")
]