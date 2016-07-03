'use strict';

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('register');
});

router.post('/', function(req, res, next) {
  console.log(req.session);
  req.session = {
    email: req.body.email,
    name: req.body.username,
    password: req.body.password
  };
  console.log(req.session);
  // knex('books').insert({title: 'Slaughterhouse Five'})
  knex('members').insert({name: req.body.username, email: req.body.email, password: req.body.password});
  // res.redirect('/home');
  res.render('')
});

module.exports = router;
