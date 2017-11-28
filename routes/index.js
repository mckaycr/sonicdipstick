var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var results = { date: '11/28/2017',data: 20.56,time: '14:00:14' }
 // 	var options = {
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
	res.render('pages/index', { title: 'Sonic Dip Stick', data:results.data });
});

module.exports = router;
