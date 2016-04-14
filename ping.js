 var schedule = require('node-schedule');
var PythonShell = require('python-shell');
  var rule = new schedule.RecurrenceRule();
  rule.second = 30;
  var j = schedule.scheduleJob(rule, function(){
    PythonShell.run('measure.py', function (err) {
      if (err) throw err;
      console.log('ping')
    });
  });