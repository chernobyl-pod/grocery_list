'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  knex.from('members').innerJoin('households-members', 'members.id', 'households-members.members_id').innerJoin('households', 'households-members.households_id', 'households.id');
  res.render('householdList');
});
module.exports = router;
