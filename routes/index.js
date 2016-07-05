'use strict';

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.session.name) {
    res.render('myhouse', {groceries: []});
    console.log(req.session);
  } else {
    console.log(req.session);
    res.render('home');
  }
});

module.exports = router;
