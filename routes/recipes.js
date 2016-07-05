'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  console.log(req.session);
  res.render('recipes', {household: req.session.household});
});

router.get('/new', function(req, res) {
  res.render('addnewrecipe');
});

module.exports = router;
