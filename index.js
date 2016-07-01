'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var knex = require('knex');
var url = require('url');

var login = require('./routes/login');
var register = require('./routes/register');
var home = require('./routes/index');

var app=express();
var router = express.Router();

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', home);
app.use('/login', login);
app.use('/register', register);

var port = 3000;
app.listen(port, function() {
  console.log("Listening on 3000");
});
