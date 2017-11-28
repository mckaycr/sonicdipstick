var express = require('express');
var router = express.Router();
var oil = require(__dirname+'/oilLevel.js');

/* GET home page. */
router.get('/', function(req, res, next) {
 	var options = {
	    pin:11
	}
	oil.check(options, function(err,results){
	    if(!err){
	    	console.log(results)
	    	res.render('pages/index', { title: 'Sonic Dip Stick', data:results.data, error:null });
	   	}else{
	   		console.log(err)
	   		res.render('pages/index', { title: 'Sonic Dip Stick', data:0, error:err });
	   	}
	})
});

module.exports = router;
