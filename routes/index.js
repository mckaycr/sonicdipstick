var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://192.168.0.151:27017/";
var settings = {}
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("sdsdata");
//   dbo.collection("settings").findOne({}, function(err, result) {
//     if (err) throw err;
//     settings=result
//     console.log(settings)
//     db.close();
//   });
// });
	if(process.env.NODE_ENV != 'development'){
	var oil = require('../model/oilLevel.js');
	/* GET home page. */
	router.get('/', function(req, res, next) {
		var settings = {}
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db("sdsdata");
		  dbo.collection("settings").findOne({}, function(err, result) {
		    if (err) throw err;
		    settings=result
		    console.log(settings)
		    db.close();
		  });
		});
		var options = {
				pin:11
		}
		oil.check(options, function(err,results){
			if(!err){
				console.log(results)
				res.render('pages/index', {
					title: settings.device_name, 
					data:results.data, 
					error:null,
					tank_cap:settings.tank_cap,
					tank_height:settings.tank_height,
					unit_display:settings.unit_display
				});
			}else{
				console.log(err)
				res.render('pages/index', {
					title: settings.device_name,
					data:0,
					error:err,
					tank_cap:settings.tank_cap,
					tank_height:settings.tank_height,
					unit_display:settings.unit_display
				});
			}
		})
	});
	}else{
// 		***************** Develompent Mode ********************
		router.get('/', function(req, res, next) {
			var results = {date:'11/29/2017',data:{'residual':'26', 'percentile':59,'gallons':162},time: '13:38:18' }
			res.render('pages/index', {
				title: settings.device_name,
				data:results.data,
				error:null,
				tank_cap:settings.tank_cap,
				tank_height:settings.tank_height,
				unit_display:settings.unit_display
			});
	});
}
module.exports = router;
