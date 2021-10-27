import json
import traceback
import socket
import threading

from flask.helpers import make_response

HEADER = 64
PORT = 5050
SERVER = socket.gethostbyname(socket.gethostname())
ADDR = (SERVER, PORT)
FORMAT = 'utf-8'
DISCONNECT_MESSAGE = "!DISCONNECT"
print(socket.gethostname())


class client_send:
    def __init__(self, SERVER, FORMAT, PORT, message):
        self.ADDR = (SERVER, PORT)
        self.FORMAT = FORMAT
        self.HEADER = 64
        self.message = message

    def send(self):
        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client.connect(self.ADDR)
        def sending(msg):
            message = msg.encode(FORMAT)
            msg_length = len(message)
            send_length = str(msg_length).encode(FORMAT)
            send_length += b' ' * (HEADER -len(send_length))
            client.send(send_length)
            client.send(message)
            print(client.recv(2048)) 
        
        sending(self.message)
        return("Successful")


active_conn = []
num = -1

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(ADDR)


def handle_client(conn, addr):
    global num
    global DISCONNECT_MESSAGE
    global active_conn
    print(f"[NEW CONNECTION] {addr} connected.")
    num += 1
    active_conn.append(addr)
    connected = True
    while connected:
        msg_length = conn.recv(HEADER).decode(FORMAT)
        if msg_length:
            msg_length = int(msg_length)
            msg = conn.recv(msg_length).decode(FORMAT)
            if msg == DISCONNECT_MESSAGE:
                connected = False
                num -= 1
                active_conn.pop(num)
            elif msg == int:
                print("You got the number")

            else:
                msg = json.loads(msg)
                if msg['Action']:

                    if msg['Action'] == 'Send':
                        msg['Action'] = 'Receive'
                        s = client_send(msg['Server'], FORMAT,
                                        msg['Port'], json.dumps(msg))
                        try:

                            #LAddr[y]['status'] = x.send()
                            status = s.send()
                            conn.send(status.encode(FORMAT))
                            if status == "Successful":
                                with open('server1.json', "r") as f:
                                    data = json.load(f)
                                    Esend = int(msg['Amount'])
                                    data['Energy'] = data['Energy'] - Esend
                                jsonFile= open("server1.json", 'w')
                                jsonFile.write(json.dumps(data, indent=2))
                            d = client_send(msg['Server'], FORMAT,
                                            msg['Port'], DISCONNECT_MESSAGE)
                            d.send()
                        
                        # return  make_response("Success")

                        # return make_response("Fail Server Is not Free")

                        except:
                            traceback.print_exc()
                            conn.send("Fail Somewhere".encode(FORMAT))

                        # By Right Your suppose to send UDP to the OpalRT server from here
                    elif msg['Action'] == 'Receive':
                        # Well This is also wat your suppose to send
                        print(msg) 
                        with open('server1.json', "r") as f:
                            data = json.load(f)
                            Esend = int(msg['Amount'])
                            data['Energy'] = data['Energy'] + Esend
                        jsonFile= open("server1.json", 'w')
                        jsonFile.write(json.dumps(data, indent=2))
                    elif msg['Action'] == 'GetInfo':
                        with open('server1.json', 'r') as f:
                            data = json.load(f)
                            amount = str(data['Energy'])
                            return_stats ={
                                'Energy' : amount
                            }
                            conn.send(json.dumps(return_stats).encode(FORMAT))

                else:
                    print(" There is an error with the msg")

    # print(f"[{addr}] {msg}")

        # conn.send("Online".encode(FORMAT))

    conn.close()


def start():
    server.listen()
    print(f"[LISTENING] Server is listening on {SERVER}")
    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target=handle_client, args=(conn, addr))
        thread.start()
        print(f"[ACTIVE CONNECTIONS] {threading.activeCount() -1 }")


print("[STARTING] server is starting....")
start()
