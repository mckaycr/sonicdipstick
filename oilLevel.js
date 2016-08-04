var PythonShell = require('python-shell');

function oilLevel(){
	this.check = function(callback, options){
		measure(options, function(err,res){
			if(err){callback(err)}
			else{callback(null,res)}
		}, options)
	}
}


function measure(options, callback){
	var opts={
		args:[11]
	}
	PythonShell.run('measure.py',opts, function (err,results) {
		    if (err){callback(err)}
    		else{
    			callback(null,JSON.parse(results[0]))};
  	})
}
module.exports = new oilLevel();