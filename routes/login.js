'use strict';

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();
var bcrypt = require('bcrypt');

router.get('/', function(req, res) {
  res.render('login', {match: true});
});

router.post('/', function(req, res) {
  knex.from('members').innerJoin('households-members', 'members.id', 'households-members.members_id').innerJoin('households', 'households-members.households_id', 'households.id').where('members.email', req.body.email).select('households.name', 'members.email', 'members.password')
  .then(function(data) {
    if (data[0]) {
      console.log(data);
      bcrypt.compare(req.body.password, data[0].password, function(err, result) {
        if (result) {
          console.log(result);
          req.session = {
            email: data[0].email,
            household: data[0].name
          };
          res.redirect('/');
        }
        else {
          res.render('login', {match: false});
        }
      });
    }
  });
});

module.exports = router;
