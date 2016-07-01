'use strict';

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.session) {
    res.redirect('/households');
  } else {
    res.render('home');
  }
});

module.exports = router;
