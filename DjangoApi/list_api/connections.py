import socket
import json
import traceback
DISCONNECT_MESSAGE = "!DISCONNECT"

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


def Getinfo(request):
    status = {
    "Energy": '',
    'Action': 'GetInfo'
    }
    if(request):
        ADDR = request['IP']
        PORT = request['Port']

        # Send Messsage to the Client Server to Check
        x = connect(ADDR, 'utf-8', PORT, json.dumps(status))
        try:
            #LAddr[y]['status'] = x.send()
            status = x.send()
            status = json.loads(status)
            print(status)
            Energy = status['Energy']
        except:
            return ("Fail At Connecting to Server")

        return (Energy)

def SendEnergy(Buyer, Seller, Contract):
    print(Contract)
    print(Seller)
    print(Buyer)
    ADDR = Seller['IP']
    PORT_ADDR = Seller['Port']
    req_msg = {
        
            "Action": "Send",
            "Port": '',
            "Server": "",
            "Amount": 0
        }
    
    req_msg['Port'] = int(Buyer['Port'])
    req_msg['Server'] = Buyer['IP']
    req_msg['Amount'] = int(Contract['Amount'])
    try:
        x = connect(ADDR, 'utf-8', PORT_ADDR, json.dumps(req_msg))
        status = x.send()
        print(status)      
    except:
        traceback.print_exc()
        return("Unsuccessful")
    return status