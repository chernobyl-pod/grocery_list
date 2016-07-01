'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var knex = require('knex');

var routeTester = require('./routes/routeTester');

var app=express();
var router = express.Router();

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routeTester);

var port = 3000;
app.listen(port, function() {
  console.log("Listening on 3000");
});
