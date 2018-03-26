var express = require('express');
var router = express.Router();
if(process.env.NODE_ENV != 'development'){
	var oil = require('../model/oilLevel.js');

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

}else{
	router.get('/', function(req, res, next) {
		var results = {date:'11/29/2017',data: 13.768741607666016,time: '13:38:18' }
		res.render('pages/index', { title: 'Sonic Dip Stick', data:results.data, error:null });
	});
}


module.exports = router;
