var oil = require('./oilLevel.js');

var options = {
	persist:true
}

oil.check(function(err,value){
	if(err){console.log(err)}
	else{console.log(value)}
});