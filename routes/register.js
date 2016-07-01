'use strict';

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('register');
});

router.post('/', function(req, res) {
  console.log(req.session);
  req.session = {
    email: req.body.email,
    name: req.body.username,
    password: req.body.password
  };
  console.log(req.session);
  knex('members').insert(req.session);
  res.redirect('/');
});

module.exports = router;
