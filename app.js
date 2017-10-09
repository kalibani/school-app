var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var index = require('./routes/index');
var dashboard = require ('./routes/dashboard')
var login = require ('./routes/login')
var users = require('./routes/users');
var teachers = require('./routes/teachers');
var subjects = require('./routes/subjects');
var students = require('./routes/students');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '%@$hjkl%@%@@#$mnbvf%@#$%@@#^&*()',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.use('/', login)
app.use('/', index);
app.use('/dashboard', dashboard)
app.use('/users', users);
app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/students', students);


module.exports = app;
