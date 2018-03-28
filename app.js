var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var about = require('./routes/about');
var api = require('./routes/api');
var settings = require('./routes/settings');

var schedule = require('node-schedule');
var oil = require('./model/oilLevel.js')
var request = require('request');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/about', about);
app.use('/api', api);
app.use('/settings', settings);

var j = schedule.scheduleJob('*/1 * * * *', function(){
  if(app.get('env') === 'development'){
    var results = {date:'11/29/2017',data: 13.768741607666016,time: '13:38:18' };
    var options = {
      uri: 'https://dweet.io:443/dweet/for/sonicdipstick?date='+results.date+'&time='+results.time+'&data='+results.data,
      method:'POST',
      json:true
    }
    request(options,function(err, res, body){
      console.log(body)
    })    
  }else{
		oil.check({pin:11}, function(err,results){
      var options = {
        uri: 'https://dweet.io:443/dweet/for/sonicdipstick?date='+results.date+'&time='+results.time+'&data='+results.data,
        method:'POST',
        json:true
      }
      request(options,function(err, res, body){
        console.log(body)
      })
    });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
      title: 'Sonic Dip Stick - Error',
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('pages/error', {
    title: 'Sonic Dip Stick - Error',
    message: err.message,
    error: {}
  });
});


module.exports = app;
