'use strict';

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.session.email) {
    res.render('myhouse', {groceries: [], household: req.session.household});
  } else {
    res.render('home');
  }
});

module.exports = router;
