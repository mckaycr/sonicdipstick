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
		else{
			var s = JSON.parse(results[0])
			conversion(s.values,options.unit,function(res){
				s.values=res;
				callback(null, s);
			})
		}
	})
}
module.exports = new oilLevel();

function conversion(data, unit, callback){
	var res = 1;
	switch(unit){
		case 'in':
			res = 1;
			break;
		case 'cm':
			res = 2.54;
			break;
		case 'mm':
			res = 25.4;
			break;
	}
	var temp = data*res;
	callback(temp);
}