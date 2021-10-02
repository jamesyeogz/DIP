import json
import requests

api_url = 'http://127.0.0.1:5000/test'
create_row_data = {'id': '1235','name':'Joel','created_on':'27/01/2018','modified_on':'27/01/2018','desc':'This is Joel!!'}
print(create_row_data)
r = requests.post(url=api_url, json=create_row_data)
print(r.status_code, r.reason, r.text)

rget = requests.get(url=api_url)
