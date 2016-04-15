var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

/* GET home page. */
router.get('/', function(req, res, next) {
	getAll(function(data){
		res.render('index', { title: 'Sonic DipStick', rows:data });
	})
});

/*
	This function queries the data.db and returns
	all measurements.  Will probably scale this down
	to last n measurements

	@params callback is a function 

 */

function getAll(callback){
	db.serialize(function(){
		db.all("SELECT * from data order by date DESC", function(err, data){
			convertData(data, function(results){
				callback(results)
			})
		})
	})
}

/*
	This function formats the measurement data
	to something a little more readable for the 
	web interface

	@params arrayOfObjs is an array of measurement objects
	{date:mm/dd/yyyy, time:HH:MM:SS, measurement:00.000000000}
	measurement is currently in inches
	@params callback is a function to process the converted object 

 */

function convertData(arrayOfObjs, callback){
	var array = arrayOfObjs.map(function(value, index){
		return [value.date + " " + value.time, value.measurement];
	})
	callback(array)
}

module.exports = router;


