import time
import datetime
import sqlite3
import os.path
import RPi.GPIO as GPIO

# Establish a new database if one doesnt exist
if not os.path.exists('data.db'):
        file = open('data.db','a');
        file.close()
        conn = sqlite3.connect('data.db')
        c = conn.cursor()
        c.execute('''CREATE TABLE data (date text, time text, measurement text)''')
        conn.commit()
        conn.close()

# Establish connection to the database were measurements are kept
conn = sqlite3.connect('data.db')
c = conn.cursor()

# Initiate RPI GPIO pins
GPIO.setmode(GPIO.BOARD)
# Set time out incase echo isn't received
timeout = 0.020

# Set pin 11 up for sending
GPIO.setup(11, GPIO.OUT)
# Make sure output is set correctly
GPIO.output(11, 0)
# Wait long enough to for pin to set
time.sleep(0.000002)
# Send signal
GPIO.output(11, 1)
# Send it for 5 micro seconds
time.sleep(0.000005)
# Turn off signal
GPIO.output(11, 0)
# Set pin to read incoming echos
GPIO.setup(11, GPIO.IN)
# Set default to true
goodread=True
# Start Timeout clock
watchtime=time.time()
# Loop pin 11 hasn't received anything
# and timeout hasn't reached max
while GPIO.input(11)==0 and goodread:
		# Start timer to measure echo return
        starttime=time.time()
        if (starttime-watchtime > timeout):
        		# We have reached the timout limit
        		# Stop measuring and throw an error
                goodread=False

if goodread:
        watchtime=time.time()
        # If pin 11 recieved a ping, and we haven't timed out
        while GPIO.input(11)==1 and goodread:
        		# record the time ping was received
                endtime=time.time()
                if (endtime-watchtime > timeout):
        		# We have reached the timout limit
        		# Stop measuring and throw an error
                    goodread=False

if goodread:
		# Time ping was received minus the time ping was sent
        duration=endtime-starttime
        # Factor in the speed of sound
        distance=duration*13512
        # Close up shop
        GPIO.cleanup()
        print distance
        # Write results to database
        c.execute("INSERT INTO DATA VALUES ('%s','%s','%s')" % (time.strftime("%m/%d/%Y"),time.strftime("%H:%M:%S"), distance))
conn.commit()
conn.close()
