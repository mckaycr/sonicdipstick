var PythonShell = require('python-shell');
var defaults = {pin:11,	unit:'in'};

function oilLevel(){
	this.check = function(options, callback){
		if(typeof options==='function' || typeof callback === undefined){
			callback = options;
			options = defaults;
		}
		validateOptions(options,function(nopts){
			measure(nopts, function(err,res){
				if(err){callback(err)}
				else{callback(null,res)}
			})
		})
	}
}

module.exports = new oilLevel();

function measure(options, callback){
	var opts={
		args:[options.pin],
		scriptPath:__dirname
	}
	PythonShell.run('measure.py',opts, function (err,results) {
	    if(err){callback(err)}
		else{
			if(results===null){
				var e =  new Error('Sensor Issue - make sure you are using the right pin number')
				callback(e);
			}
			else{
				var s = JSON.parse(results[0])
				conversion(s.data,options.unit,function(res){
					s.data=res;
					callback(null, s);
				})
			}
		}
	})
}

function validateOptions(input, callback){
	var newOptions = input
	if(!input.hasOwnProperty('pin')){newOptions.pin=defaults.pin}
	if(!input.hasOwnProperty('unit')){newOptions.unit=defaults.unit}
	callback(newOptions)
}

function conversion(data, unit, callback){
	var multi = 0;
	switch(unit){
		case 'in':
			multi = 1;
			break;
		case 'cm':
			multi = 2.54;
			break;
		case 'mm':
			multi = 25.4;
			break;
		default:
			multi=1;
	}
	var res = data*multi;
	callback(res);
}
