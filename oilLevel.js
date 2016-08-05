var PythonShell = require('python-shell');

function oilLevel(){
	this.check = function(options, callback){
		if(typeof options==='function' || callback === null){
			callback = options;
			options = {
				pin:11
			}
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