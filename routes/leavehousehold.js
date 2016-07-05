'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();

router.post('/:household', function(req, res) {
  knex('households-members').innerJoin('households', 'households.id', 'households-members.households_id').innerJoin('members', 'members.id', 'households-members.members_id').where({'households.name': req.params.household, 'members.email': req.session.email}).select('households-members.id').then(function(data) {
    console.log(data[0].id);
    knex('households-members').where('id', data[0].id).del().then(function(other) {
      res.redirect('/');
    });
  });
  //remove household
});

module.exports = router;
