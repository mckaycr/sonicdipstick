# Sonic Dipstick
Project for measuring oil levels with RPI2

##Background
I have 500 gallon oil tank, just like a lot of homes out in the county.  It's down in the basement, and it has one of those pretty standard tank liquid level gauges.  This means I have to go down to the basement and check it every now and then which is not optimal

So I'm working on using my [Raspberry Pi 2](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/) and a [PING))) Ultrasonic Distance Sensor](https://www.parallax.com/product/28015) to take measurements at regular intervals, and record them to a database.  I then display the data on a website using [ExpressJS](http://expressjs.com/) also running on my RPI.

##Whats working
- oilLevel module takes measurements and returns the results as json

##Whats Next
- everything