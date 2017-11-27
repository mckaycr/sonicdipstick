var express = require('express');
var app = express();
var oil = require(__dirname + '/oilLevel.js');

// reply to request with "Hello World!"
app.get('/', function (req, res) {
  res.send('Sonic Dip Stick is now online.');
});
app.get('/check', function (req, res) {
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

//start a server on port 80 and log its start to our console
var server = app.listen(80, function () {

  var port = server.address().port;
  console.log('Example app listening on port ', port);

});
