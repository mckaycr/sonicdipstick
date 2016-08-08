var PythonShell = require('python-shell');
var defaults = {pin:11,	unit:'in'};

function oilLevel(){
	this.check = function(options, callback){
		if(typeof options==='function' || typeof callback === undefined){
			callback = options;
			options = defaults;
		}
		measure(options, function(err,res){
			if(err){callback(err)}
			else{callback(null,res)}
		})
	}
}

function measure(options, callback){
	var opts={
		args:[options.pin]
	}
	PythonShell.run('measure.py',opts, function (err,results) {
		    if (err){callback(err)}
    		else{callback(null,JSON.parse(results[0]))};
  	})
}
module.exports = new oilLevel();