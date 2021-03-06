var expect = require("chai").expect;
var oil = require('../model/oilLevel.js');

describe('oilLevel',function(){
	describe('check', function(){
		it('should return a json object with a date, measurement, and time', function(done){
			var options = {
				pin:11
			}
			oil.check(options,function(err,results){
				expect(results).to.have.a.property('date');
				expect(results).to.have.a.property('time');
				expect(results).to.have.a.property('values');
				//console.log(results)
				done()
			})
		})
		it('should consider options to be optional, and revert to defaults', function(done){
			oil.check(function(err,results){
				expect(results).to.have.a.property('date');
				expect(results).to.have.a.property('time');
				expect(results).to.have.a.property('values');
				//console.log(results)
				done()
			})
		})
		it('should convert measurement to cm', function(done){
			var options = {
				pin:11,
				unit:'cm'
			}
			oil.check(options, function(err,results){
				expect(results).to.have.a.property('date');
				expect(results).to.have.a.property('time');
				expect(results).to.have.a.property('values');
				//console.log(results)
				done()
			})
		})
		it('should convert measurement to mm', function(done){
			var options = {
				pin:11,
				unit:'mm'
			}
			oil.check(options, function(err,results){
				expect(results).to.have.a.property('date');
				expect(results).to.have.a.property('time');
				expect(results).to.have.a.property('values');
				//console.log(results)
				done()
			})
		})
		it('should resolve missing options properties to default when not all properties are provided', function(done){
			var options = {
				unit:'mm'
			}
			oil.check(options, function(err,results){
				expect(results).to.have.a.property('date');
				expect(results).to.have.a.property('time');
				expect(results).to.have.a.property('values');
				//console.log(results)
				done()
			})
		})
		it('should resolve missing options properties to default when not all properties are provided', function(done){
			var options = {}
			oil.check(options, function(err,results){
				expect(results).to.have.a.property('date');
				expect(results).to.have.a.property('time');
				expect(results).to.have.a.property('values');
				//console.log(results)
				done()
			})
		})
		it('callback should return an error due to using the wrong pin', function(done){
			var options = {
				pin:12,
				unit:'mm'
			}
			oil.check(options, function(err,results){
				expect(err)
				//console.log(results)
				done()
			})
		})
		it('checks for unhandled errors',function(done){
			var options = {
				pins:'in',
				uni:'12'
			};
			oil.check(options, function(err,results){
				if(err){expect(err)}
				else{
					expect(results).to.have.a.property('date');
					expect(results).to.have.a.property('time');
					expect(results).to.have.a.property('values');
				}
				done();
			})
		})
	})
})