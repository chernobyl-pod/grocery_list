'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', function(req, res) {
  knex.from('members').innerJoin('households-members', 'members.id', 'households-members.members_id').innerJoin('households', 'households-members.households_id', 'households.id').where('members.email', req.body.email).select('households.name', 'members.email', 'members.password').then(function(data) {
    console.log(data);
    if (data[0] && data[0].password === req.body.password) {
            req.session = {
              email: data[0].email,
              password: data[0].password,
              household: data[0].name
            };
            res.render('myhouse', {groceries: [], household: req.session.household});
    }
  });
});

module.exports = router;
