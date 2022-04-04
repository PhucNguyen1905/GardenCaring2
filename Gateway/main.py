from glob import glob
import sys
from Adafruit_IO import MQTTClient
import time
from datetime import datetime
import serial.tools.list_ports
import socketio
import threading
from io_adafruit import *
# ============ Socket Section =============

sio = socketio.Client()


@sio.event
def connect():
    print('connection established')

# Get Light control


@sio.on('Server-control-light')
def response(data):
    client.publish("co3109-light", data)
# Get Pump control


@sio.on('Server-control-pump')
def response(data):
    client.publish("co3109-pump", data)
# Get Dome control


@sio.on('Server-control-dome')
def response(data):
    client.publish("co3109-dome", data)


@sio.event
def disconnect():
    print('disconnected from server')


sio.connect('http://localhost:8080')


def sioWait():
    global sio
    sio.wait()


siowait = threading.Thread(target=sioWait)
siowait.start()

# ============ Socket Section =============


def connected(client):
    print("Ket noi thanh cong ...")
    for feed in AIO_FEED_ID:
        client.subscribe(feed)


def subscribe(client, userdata, mid, granted_qos):
    print("Subcribe thanh cong ...")


def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit(1)


def message(client, feed_id, payload):
    print("Nhan du lieu : " + payload)
    ser.write((str(payload) + "#") . encode())


def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        if "USB Serial Device" in strPort or "com0com" in strPort:
            splitPort = strPort.split(" ")
            commPort = (splitPort[0])
    print(commPort)
    return commPort


isMicrobitConnected = False
if getPort() != "None":
    ser = serial . Serial(port=getPort(), baudrate=115200)
    isMicrobitConnected = True


def processData(data):
    global sio
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)

    # Get current time
    timeSend = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    timeSend = timeSend.split()

    if splitData[1] == 'TEMP':
        # Publish to adafruit.io server
        client.publish("co3109-temp", splitData[2])

        # Send to socket.io server
        sio.emit('Gateway-send-temp', {
            'value': splitData[2],
            'time': timeSend[1],
            'date': timeSend[0]
        })

        # Process data below...

    elif splitData[1] == 'HUMI':
        client.publish("bbc-humidity", splitData[2])
        # Process data below...

    elif splitData[1] == 'MOIST':
        # Publish to adafruit.io server
        client.publish("co3109-moisture", splitData[2])

        # Send to socket.io server
        sio.emit('Gateway-send-moist', {
            'value': splitData[2],
            'time': timeSend[1],
            'date': timeSend[0]
        })

        # Process data below...


mess = ""


def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]


client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()


def runGateway():
    global isMicrobitConnected
    global sio
    while True:
        if isMicrobitConnected:
            readSerial()
        time . sleep(1)


gateway = threading.Thread(target=runGateway)
gateway.start()
