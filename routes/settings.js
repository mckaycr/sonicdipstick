var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongdb:27017/";
var settings = {}
/* GET home page. */
router.get('/', function(req, res, next) {
	  MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db("sdsdata");
	    dbo.collection("settings").findOne({}, function(err, result) {
		    if (err) throw err;
	        settings = result
			res.render('pages/settings', {
				title:"Sonic Dip Stick - Settings",
			    device_name:settings.device_name,
			    tank_cap:settings.tank_cap,
			    tank_height:settings.tank_height,
			    unit_display:settings.unit_display
			 });
	      	db.close();
	    });
	  });
});
router.post('/',function(req, res, next){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sdsdata");
    var myquery = { _id: settings._id };
    var newvalues = { $set: {device_name:req.body.device_name,tank_cap:req.body.tank_capcity,tank_height:req.body.tank_height,unit_display:req.body.DisplayUnit} };
    dbo.collection("settings").updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      console.log("settings updated");
      db.close();
      res.redirect('/');
    });
  });
})

module.exports = router;
