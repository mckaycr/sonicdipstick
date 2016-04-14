var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

/* GET home page. */
router.get('/', function(req, res, next) {
	db.serialize(function(){
		db.all("SELECT * from data", function(err, data){
			var converted = convertData(data)
			res.render('index', { title: 'Sonic DipStick', rows:converted });
		})
	})
});

function convertData(arrayOfObjs){
	var array = arrayOfObjs.map(function(value, index){
		return [value.date + " " + value.time, value.measurement];
	})
	return array
}
module.exports = router;
