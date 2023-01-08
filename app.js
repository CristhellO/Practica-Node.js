var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const authMiddleware = require('./lib/authMiddleware.js');

require('./lib/connectMongoose');
require('./routes/api/anuncios');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.locals.title = 'nodepop'
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//rutas de mi API
app.use('/api/anuncios', authMiddleware, require('./routes/api/anuncios'));

//rutas de mi website
app.use('/', function(req, res, next) {
  console.log('recibo una peticion');
  next();
})

app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // comprobar si e sun error de validacion 
  if (err.array) {
    err.stastus = 422; //error de validacion
    const errorInfo = err.array({ onlyFirstError: true})[0];
    console.log(errorInfo);
    err.message = 'Error in ${errorInfo.location},param "${errorInfo.msg}';
  }

  res.status(err.status || 500);

 // si es una peticion al API, responder con formato JSON
 if (req.originalUrl.startWith('/api/')) {
  res.json({ error: err.message });
  return;
 }


  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
