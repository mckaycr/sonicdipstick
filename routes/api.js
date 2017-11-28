var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send({ date: '11/28/2017',data: 20.56,time: '14:00:14' });
 //  	var options = {
	//     pin:11
	// }
	// oil.check(options, function(err,results){
	//     if(!err){
	//     	console.log(results)
	//     	res.send(results);
	//    	}else{
	//    		console.log(err)
	//    		res.send(err)
	//    	}
	// })
});

module.exports = router;
