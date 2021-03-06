var express = require('express');
var apicache = require('apicache')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

var index = require('./routes/index');
var system = require('./routes/system');
var application = require('./routes/application');

var app = express();

let cache = apicache.middleware;

var dd_options = {
    'response_code':true,
    'tags': ['app:IU7_loadbalance']
};

var connect_datadog = require('connect-datadog')(dd_options);


app.use(cache('5 minutes'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//datadog
app.use(connect_datadog);

//routers
app.use('/', index);
app.use('/api/system',system);
app.use('/api/app',application);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
