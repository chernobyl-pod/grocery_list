'use strict';

var express = require('express');
var knex = require('../db/knex.js');

var router = express.Router();

router.get('/', function(req, res) {
  res.render('register');
});

router.post('/', function(req, res, next) {
  req.session = {
    email: req.body.email,
    name: req.body.username,
    password: req.body.password
  };
  knex('members').insert({name: req.body.username, email: req.body.email, password: req.body.password})
  .then(function(data){
    res.redirect('addhousehold');
  }).catch(next);

});

module.exports = router;
