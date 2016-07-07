'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();


router.get('/', function(req, res) {
  knex('households').then(function(data) {
    res.render('joinHousehold', {households: data, household: household});
  });
});

router.post('/:name', function(req, res) {
  knex('members').where('email', req.session.email)
  .then(function(member) {
    knex('households').where('name', req.params.name)
    .then(function(house) {
      knex('households-members').where('households_id', house[0].id).where('members_id', member[0].id)
      .then(function(existing) {
        if (!existing[0]) {
          knex('households-members').insert([{households_id: house[0].id, members_id: member[0].id}])
          .then(function() {
            res.redirect('/');
          })
        }
        else {
          res.redirect('/');
        }
      })
    })
  });
});
module.exports = router;
