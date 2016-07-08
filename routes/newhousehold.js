'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('createHousehold.ejs');
});

router.post('/', function(req, res) {
  console.log(req.body.name);
  knex('households').insert({name: req.body.name})
  .then(function() {
    req.session.household = req.body.name;
    res.redirect('/');
  });
});
module.exports = router;
