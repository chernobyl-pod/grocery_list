'use strict';

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('register');
});

router.post('/', function(req, res) {
  req.session = {
    email: req.params.email,
    name: req.params.name,
    password: req.params.password
  };
  knex('members').insert(req.session);
  res.redirect('/');
});

module.exports = router;
