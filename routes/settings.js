var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://192.168.0.151:27017/";
var settings = {}
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("sdsdata");
  dbo.collection("settings").findOne({}, function(err, result) {
    if (err) throw err;
    settings=result
    db.close();
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var obj = settings;
  res.render('pages/settings', {
    title:"Sonic Dip Stick - Settings",
    device_name:obj.device_name,
    tank_cap:obj.tank_cap,
    tank_height:obj.tank_height,
     unit_display:obj.unit_display
  });
});
router.post('/',function(req, res, next){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sdsdata");
    var myquery = { _id: settings._id };
    var newvalues = { $set: {device_name:req.body.device_name,tank_cap:req.body.tank_capcity,tank_height:req.body.tank_height,unit_display:req.body.DisplayUnit} };
    dbo.collection("settings").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("settings updated");
      db.close();
      res.redirect('/');
    });
  });
})

module.exports = router;
