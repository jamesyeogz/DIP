
from os import stat
from flask import Flask, request
from flask.helpers import make_response
import json
import traceback
import socket
from flask_cors import CORS


DISCONNECT_MESSAGE = "!DISCONNECT"
app = Flask(__name__)
CORS(app)


class connect:
    def __init__(self, SERVER, FORMAT, PORT, message):
        self.ADDR = (SERVER, PORT)
        self.FORMAT = FORMAT
        self.HEADER = 64
        self.message = message

    def send(self):
        global DISCONNECT_MESSAGE
        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client.connect(self.ADDR)
        def sending(msg):
            message = msg.encode(self.FORMAT)
            msg_length = len(message)
            send_length = str(msg_length).encode(self.FORMAT)
            send_length += b' ' * (self.HEADER -len(send_length))
            client.send(send_length)
            client.send(message)
            return(client.recv(2048)) 
        
        msgg= sending(self.message)
        sending(DISCONNECT_MESSAGE)
        return(msgg)


# class connect:
#     def __init__(self, SERVER, FORMAT, PORT, message):
#         self.ADDR = (SERVER, PORT)
#         self.FORMAT = FORMAT
#         self.HEADER = 64
#         self.message = message

#     def send(self):
#         client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#         client.connect(self.ADDR)

#         while True:
#             dc = "!DISCONNECT"
#             dc_length = len(dc)
#             dc_length = str(dc_length).encode(self.FORMAT)
#             dc_length += b' ' * (self.HEADER - len(dc_length))
#             disconnect = dc.encode(self.FORMAT)
#             message = self.message.encode(self.FORMAT)
#             msg_length = len(message)
#             send_length = str(msg_length).encode(self.FORMAT)
#             send_length += b' ' * (self.HEADER - len(send_length))
#             client.send(send_length)
#             client.send(message)
#             receive = client.recv(2048)
#             client.send(dc_length)
#             client.send(disconnect)
#             return (receive)


LAddr = []
y = -1


@app.route('/')
def index():
    return "Hello World"

# {
#     "name" : "Chee Kien",
#     "port" : 5050,
#     "address": "192.168.1.60",
#     "status": "Pending"
# }
# {
#     "name" : "James",
#     "port" : 5151,
#     "address": "192.168.1.60",
#     "status": "Pending"
# }

@app.route('/check', methods=['GET', 'POST'])
def check():
    global DISCONNECT_MESSAGE
    global LAddr
    global y
    if request.method == 'POST':
        status = {
            "name": '',
            "status": '',
            'Action': ''
        }

        if(request.data):
            msg = json.loads(request.data)
            LAddr.append(msg)
            y = int(y)+1
            name = LAddr[y]['name']
            ADDR = LAddr[y]['address']
            PORT = int(LAddr[y]['port'])
            status['status'] = LAddr[y]['status']
            status['name'] = name

            print(LAddr[y]['status'])
            make_response("Waiting for Server Response")
            # Send Messsage to the Client Server to Check
            x = connect(ADDR, 'utf-8', PORT, json.dumps(status))
            try:
            
                #LAddr[y]['status'] = x.send()
                status = x.send()
                status = json.loads(status)
                print(status)
                LAddr[y]['status'] = status['status']
                LAddr[y]['Energy'] = status['Energy']
                
                # return  make_response("Success")


            except:
                traceback.print_exc()
                return make_response("Fail At Connecting to Server")

            return make_response(LAddr[y]['status'])
    if request.method == 'GET':
        if(LAddr):
            
            return make_response(str(LAddr))
        else:
            return make_response("No Connection Available")


#  {
#     "Amount" : 1000,
#     "From" : "192.168.1.60",
#     "To" : "192.168.1.60",
#     "Sender_Port" : "5050",
#     "Port" : "5051"
#  }


@app.route('/bid', methods=['GET', 'POST'])
def bid():
    if request.method == 'POST':
        if (request.data):
            msg = json.loads(request.data)
            ADDR = msg['From']
            PORT_ADDR = int(msg['Sender_Port'])

            req_msg = {
                
                    "Action": "Send",
                    "Port": '',
                    "Server": "",
                    "Amount": int
                }
            
            req_msg['Port'] = int(msg['Port'])
            req_msg['Server'] = msg['To']
            req_msg['Amount'] = msg['Amount']
            try:

                x = connect(ADDR, 'utf-8', PORT_ADDR, json.dumps(req_msg))
                status = x.send()
                print(status)      


            except:
                traceback.print_exc()
                return make_response("Fail At Connecting to Server")
        return make_response(status)


if __name__ == "__main__":
    app.run(host='localhost', debug=False, use_reloader=True)
