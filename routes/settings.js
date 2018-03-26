var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
 fs.readFile('model/settings.json', function(err,data){
    var obj = JSON.parse(data);
    res.render('pages/settings', {
      title:"Sonic Dip Stick - Settings",
      device_name:obj.device_name,
      tank_cap:obj.tank_cap,
      tank_height:obj.tank_height
    });
 })
});
router.post('/',function(req, res, next){
  var settings = JSON.stringify({
    device_name:req.body.device_name,
    tank_cap:req.body.tank_capcity,
    tank_height:req.body.tank_height
  })
  fs.writeFile('model/settings.json',settings, 'utf8', function(){
    res.redirect('/');
  })
})

module.exports = router;
