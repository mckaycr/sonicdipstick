import time
import datetime
import sqlite3
import os.path
import RPi.GPIO as GPIO

if not os.path.exists('data.db'):
        file = open('data.db','a');
        file.close()
        conn = sqlite3.connect('data.db')
        c = conn.cursor()
        c.execute('''CREATE TABLE data (date text, time text, measurement text)''')
        conn.commit()
        conn.close()

conn = sqlite3.connect('data.db')
c = conn.cursor()

GPIO.setmode(GPIO.BOARD)

timeout = 0.020


GPIO.setup(11, GPIO.OUT)
#cleanup output
GPIO.output(11, 0)

time.sleep(0.000002)

#send signal
GPIO.output(11, 1)

time.sleep(0.000005)

GPIO.output(11, 0)

GPIO.setup(11, GPIO.IN)

goodread=True
watchtime=time.time()
while GPIO.input(11)==0 and goodread:
        starttime=time.time()
        if (starttime-watchtime > timeout):
                goodread=False

if goodread:
        watchtime=time.time()
        while GPIO.input(11)==1 and goodread:
                endtime=time.time()
                if (endtime-watchtime > timeout):
                        goodread=False

if goodread:
        duration=endtime-starttime
        distance=duration*13512
        GPIO.cleanup()
        print distance
        c.execute("INSERT INTO DATA VALUES ('%s','%s','%s')" % (time.strftime("%d/%m/%Y"),time.strftime("%H:%M:%S"), distance))
conn.commit()
conn.close()
