'use strict';

var express = require('express');
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('register');
});

router.post('/', function(req, res, next) {
  req.session = {
    email: req.body.email,
    name: req.body.username
  };
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      knex('members').insert({name: req.body.username, email: req.body.email, password: hash})
      .then(function(data){
        res.redirect('addhousehold');
      }).catch(next);
    })
  })

});

module.exports = router;
