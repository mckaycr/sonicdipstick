var PythonShell = require('python-shell');

function oilLevel(){
	this.check = function(callback, options){
		measure(function(err,res){
			if(err){callback(err)}
			else{callback(null,res)}
		})
	}
}


function measure(callback){
	PythonShell.run('measure.py', function (err,results) {
		    if (err){callback(err)}
    		else{
    			callback(null,JSON.parse(results[0]))};
  	})
}
module.exports = new oilLevel();