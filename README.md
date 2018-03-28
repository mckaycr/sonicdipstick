# Sonic Dipstick
Project for measuring oil levels with RPI2

## Background
I have 275 gallon oil tank, just like a lot of homes out in the county.  It's down in the basement, and it has one of those pretty standard tank liquid level gauges.  This means I have to go down to the basement and check it every now and then which is not optimal.

So I'm working on using my [Raspberry Pi 2](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/) (or 3) and a [PING))) Ultrasonic Distance Sensor](https://www.parallax.com/product/28015) to take measurements at regular intervals, and record them to a database.  I then display the data on a website using [ExpressJS](http://expressjs.com/) also running on my RPI.

This first step is to create a module specifically for taking the measurements.
## Deployment Options
### Option 1:[Resin.io](https://resin.io) (Recommended)
#### Setup
Follow the [Getting Started](https://docs.resin.io/raspberrypi3/nodejs/getting-started/)

When you get to the [Deploy Code](https://docs.resin.io/raspberrypi3/nodejs/getting-started/#deploy-code) part, swap their simple-server-node repository with this one
```
git clone git@github.com:mckaycr/sonicdipstick.git
```
Once the repo is cloned, change directory into the newly created ```sonicdipstick``` directory and add the resin git remote endpoint by running the command ```git remote add``` shown in the top-right corner of your application page:
```
cd sonicdipstick
git remote add resin <USERNAME>@git.resin.io:<USERNAME>/<APPNAME>.git
```
From there just continue following the [Deploy Code](https://docs.resin.io/raspberrypi3/nodejs/getting-started/#deploy-code) guide again, and your oil sensor should be deployed
### Option 2:Install yourself on a raspberry pi
#### Prerequisites
```
sudo apt install -y python-dev python-rpi.gpio
```
#### Setup
```
git clone git@github.com:mckaycr/sonicdipstick.git
cd sonicdipstick
npm install
sudo npm test
sudo npm start
```
Remember that in order to use the GPIO pins you must run your app as sudo.
## Usage
In your browser go to:
```
http://<IPADDRESS>/check
```
## Results
```
{ date: '08/05/2016',
  data: 130.75472259521484,
  time: '01:16:49' }
```
## Home-Assistant Integration
It is super simple to integrate this sensor into [Home Assistant](https://home-assistant.io/).

I'm not really going to go into how to set up home assistant, so follow their [Getting Started](https://home-assistant.io/getting-started/) guide.

Once you are up and running edit your configuration.yaml file by adding the following under ```sensor:```
```
  - platform: rest
    name: 'Oil Level'
    resource: http://<IPADDRESS>/check
    unit_of_measurement: 'inches'
    value_template: '{{ value_json.data | round(0)}}'
    scan_interval: 3600
```
Then restart Home Assistant, and you should start seeing your oil measurements.