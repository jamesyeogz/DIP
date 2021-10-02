from os import error
from flask import Flask, request
import json
import socket

from flask.helpers import make_response
PORT = 5050
SERVER = "192.168.1.60"
ADDR = (SERVER, PORT)
DISCONNECT_MESSAGE = "!DISCONNECT"
FORMAT = 'utf-8'
HEADER = 64

Address = []

app = Flask(__name__)
# client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# client.connect(ADDR)



@app.route( '/api', methods=['GET'])
def index():
    return make_response("This is Online and Working")

@app.route('/api/check', methods=['POST','GET'])

def create():
    global Address
    request_data = json.loads(request.data)
    # print(request_data['address'])
    # print(request_data['status'])
    Address.append(request_data)
    # print(Address)
    # print(Address[0])

   
    
 
    if (request_data['address']):
        try:
            client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            client.connect(ADDR)
            def send(msg):
                message = msg.encode(FORMAT)
                msg_length = len(message)
                send_length = str(msg_length).encode(FORMAT)
                send_length += b' ' * (HEADER -len(send_length))
                client.send(send_length)
                client.send(message)
            send(request_data)
            send(DISCONNECT_MESSAGE)
            return print(client.recv(2048))
        except:
            return print(EOFError)
    else:
        return make_response("No Input is Found")

    

    return True

@app.route('/api/connection', methods=['GET'])
def finish():
    global Address 
    return{
        "This is Working"      


    }
@app.route('/api/test', methods=['POST'])
def test():
    address_ = request.json['address']
    status_ = request.json['status']


    print(str(address_))
    return{
        'name': 'Hello'
    }

if __name__== '__main__':
    app.run(debug=True)
