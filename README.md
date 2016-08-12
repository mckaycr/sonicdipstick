# Sonic Dipstick
Project for measuring oil levels with RPI2

##Background
I have 500 gallon oil tank, just like a lot of homes out in the county.  It's down in the basement, and it has one of those pretty standard tank liquid level gauges.  This means I have to go down to the basement and check it every now and then which is not optimal.

So I'm working on using my [Raspberry Pi 2](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/) (or 3) and a [PING))) Ultrasonic Distance Sensor](https://www.parallax.com/product/28015) to take measurements at regular intervals, and record them to a database.  I then display the data on a website using [ExpressJS](http://expressjs.com/) also running on my RPI.

This first step is to create a module specifically for taking the measurements.

##Setup
```
git clone git@github.com:mckaycr/sonicdipstick.git
cd sonicdipstick
npm install
```
##Example
```
var oil = require('oilLevel');
// This is optional, if omitted it will default to pin 11
var options = {
	pin:11
}
oil.check(options, function(err,results){
	if(!err){console.log(results)}
})
```
##Results
```
{ date: '08/05/2016',
  inches: 130.75472259521484,
  time: '01:16:49' }
```
##Options
- `pin` - This is an integer that corrisponds to the pin you have your sensor connected too.
- `unit` - The units of measurement you're like the results in.
	- `in` - Inches
	- `cm` - Centimeters
	- `mm` - Millimeters
	
##Whats Next
- Option for changing unit of measurement
- Thinking about adding an option for three pings, and then return an average??
	- I have notices a slight variance it measurements of equal distance.
- write results to a database
- design web interface

The last two bullets probably will be in a separate project.  I'd like to keep this module simple so that others could build their own interface if they choose too.