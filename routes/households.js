'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  knex.from('members').where('members.email', req.session.email).innerJoin('households-members', 'members.id', 'households-members.members_id').innerJoin('households', 'households-members.households_id', 'households.id').select('households.name').then(function(data) {
    res.render('householdList', {groceries: data, household: req.session.household});

  });
});

router.post('/:name', function(req, res) {
  req.session.household = req.params.name;
  res.redirect('/');
});
module.exports = router;
