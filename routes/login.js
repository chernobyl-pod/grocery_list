'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', function(req, res) {
  knex.select().from('members').then(function(data) {
    var match = false;
    for (var i = 0; i < data.length; i++) {
      if (data[i].email === req.body.email && data[i].password === req.body.password) {
        match = true;
        req.session = {
          email: data[i].email,
          name: data[i].name,
          password: data[i].password
        };
        res.render('myhouse', {groceries: []});
      }
    }
    if (match = false) {
      res.render('login');
    }
  });
});

module.exports = router;
