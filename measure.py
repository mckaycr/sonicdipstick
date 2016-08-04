import time
import datetime
import RPi.GPIO as GPIO
import json
import sys

# Initiate RPI GPIO pins
GPIO.setmode(GPIO.BOARD)
# Set time out incase echo isn't received
timeout = 0.020

# Set PingPin
pp=int(sys.argv[1])

# Set pin pp up for sending
GPIO.setup(pp, GPIO.OUT)
# Make sure output is set correctly
GPIO.output(pp, 0)
# Wait long enough to for pin to set
time.sleep(0.000002)
# Send signal
GPIO.output(pp, 1)
# Send it for 5 micro seconds
time.sleep(0.000005)
# Turn off signal
GPIO.output(pp, 0)
# Set pin to read incoming echos
GPIO.setup(pp, GPIO.IN)
# Set default to true
goodread=True
# Start Timeout clock
watchtime=time.time()
# Loop pin pp hasn't received anything
# and timeout hasn't reached max
while GPIO.input(pp)==0 and goodread:
		# Start timer to measure echo return
        starttime=time.time()
        if (starttime-watchtime > timeout):
        		# We have reached the timout limit
        		# Stop measuring and throw an error
                goodread=False

if goodread:
        watchtime=time.time()
        # If pin pp recieved a ping, and we haven't timed out
        while GPIO.input(pp)==1 and goodread:
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
          
        print json.dumps({'date':time.strftime("%m/%d/%Y"),'time':time.strftime("%H:%M:%S"),'inches':distance})
