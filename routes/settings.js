var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/settings', {title:"Sonic Dip Stick - Settings"});
});

module.exports = router;
