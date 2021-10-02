import socket
import json
import time
HEADER = 64
PORT = 5050
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = "!DISCONNECT"
SERVER = "192.168.1.60"
ADDR = (SERVER, PORT)


client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(ADDR)


def send(msg):
    message = msg.encode(FORMAT)
    msg_length = len(message)
    send_length = str(msg_length).encode(FORMAT)
    send_length += b' ' * (HEADER - len(send_length))
    client.send(send_length)
    client.send(message)
    print(client.recv(2048))


msg_example = {
    "name": 'James',
    "status": 'Pending',
    'Action': ''
}

# msg_example = {
#     "Action" : "Send",
#     "Port" : 5051,
#     "Server" : "192.168.1.60",
#     "Name" : "James",
#     "Amount" : 1000
# }

send(json.dumps(msg_example))
send(DISCONNECT_MESSAGE)
