import json

import socket 
import threading

HEADER = 64
PORT = 5051
SERVER = socket.gethostbyname(socket.gethostname())
ADDR =(SERVER, PORT)
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = "!DISCONNECT"
print(socket.gethostname())

class client_send:
    def __init__(self, SERVER, FORMAT, PORT, message):
        self.ADDR = (SERVER, PORT)
        self.FORMAT = FORMAT
        self.HEADER = 64
        self.message= message

    def send(self):
        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client.connect(self.ADDR)

        while True:
            dc = "!DISCONNECT"
            dc_length = len(dc)
            dc_length = str(dc_length).encode(self.FORMAT)
            dc_length += b' ' * (self.HEADER - len(dc_length))
            disconnect = dc.encode(self.FORMAT)
            message = self.message.encode(self.FORMAT)
            msg_length = len(message)
            send_length = str(msg_length).encode(self.FORMAT)
            send_length += b' ' * (self.HEADER - len(send_length))
            client.send(send_length)
            client.send(message)
            receive= client.recv(2048)
            client.send(dc_length)
            client.send(disconnect)
            return ("Successful")

active_conn = []
num = -1

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(ADDR)


def handle_client(conn, addr):
    global num
    global active_conn
    print(f"[NEW CONNECTION] {addr} connected.")
    num += 1
    active_conn.append(addr)
    connected = True
    while connected:
        msg_length = conn.recv(HEADER).decode(FORMAT)
        if msg_length:
            msg_length = int(msg_length)
            msg= conn.recv(msg_length).decode(FORMAT)
            if msg == DISCONNECT_MESSAGE:
                connected = False
                num -= 1
                active_conn.pop(num)
                print("Disconnected")
            elif msg == int:
                print("You got the number")
            else: 
                msg = json.loads(msg)
                if msg['Action'] == 'Send':
                    print("This shud not appear")
                elif msg['Action'] == 'Receive':
                    print(msg) 
                    with open('server2.json', "r") as f:
                        data = json.load(f)
                        Esend = int(msg['Amount'])
                        data['Energy'] = data['Energy'] + Esend
                    jsonFile= open("server2.json", 'w')
                    jsonFile.write(json.dumps(data, indent=2))
                    break
                else:
                    print(" There is an error with the msg")

                
        print(f"[{addr}] {msg}")
       
        conn.send("Online".encode(FORMAT))

        
    
    conn.close()

        
        



def start():
    server.listen()
    print(f"[LISTENING] Server is listening on {SERVER}")
    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target = handle_client, args=(conn, addr))
        thread.start()
        print(f"[ACTIVE CONNECTIONS] {threading.activeCount() -1 }")


print("[STARTING] server is starting....")
start()



