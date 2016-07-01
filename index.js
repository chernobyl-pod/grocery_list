'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var knex = require('knex');
var url = require('url');
require('dotenv').config();

var login = require('./routes/login');
var register = require('./routes/register');
var home = require('./routes/index');
var logout = require('./routes/logout');

var app=express();
var router = express.Router();

app.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY_ONE]
}));

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.use('/', home);
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);

var port = 3000;
app.listen(port, function() {
  console.log("Listening on 3000");
});
