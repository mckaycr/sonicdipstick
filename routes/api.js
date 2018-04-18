var express = require('express');
var router = express.Router();
if(process.env.NODE_ENV != 'development'){
	var oil = require('../model/oilLevel.js');

	/* GET users listing. */
	router.get('/', function(req, res, next) {
	  	var options = {
		    pin:11
		}
		oil.check(options, function(err,results){
		    if(!err){
		    	//console.log(results)
		    	res.send(results);
		   	}else{
		   		//console.log(err)
		   		res.send(err)
		   	}
		})
	});
}else{
	router.get('/', function(req, res, next) {
		var results =  {date:'11/29/2017',data: 13.768741607666016,time: '13:38:18' }
		res.send(results);
	});

}
module.exports = router;
