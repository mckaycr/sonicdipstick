var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongdb:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("sdsdata");
  dbo.collection('settings').find({}).toArray(function(err,results){
    if (err) throw err;
    if(results.length===0){
      var settingsObj = {device_name:"Sonic Dip Stick",tank_cap:"275",tank_height:"44",unit_display:"0"};
      dbo.createCollection("settings", function(err, res) {
        if (err) throw err;
        console.log("Settings Collection Created");
         dbo.collection("settings").insertOne(settingsObj, function(err, res) {
            if (err) throw err;
            console.log("default settings established");
            db.close();
          });
      });     
    }else{
      console.log('restoring previous settings');
      db.close();
    }
  })
});

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

// dweets
var j = schedule.scheduleJob('0 */2 * * *', function(){
  		oil.check({pin:11}, function(err,res){
      var options = {
        uri: 'https://dweet.io:443/dweet/for/sonicdipstick?date='+res.date+' '+res.time+'&gallons='+res.data.gallons,
        method:'POST',
        json:true
      }
			//console.log(options)
      request(options,function(err, res, body){
        console.log(body)
      })
  });
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
