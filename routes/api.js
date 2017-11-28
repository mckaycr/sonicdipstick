var express = require('express');
var router = express.Router();
var oil = require('../oilLevel.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  	var options = {
	    pin:11
	}
	oil.check(options, function(err,results){
	    if(!err){
	    	console.log(results)
	    	res.send(results);
	   	}else{
	   		console.log(err)
	   		res.send(err)
	   	}
	})
});

module.exports = router;
