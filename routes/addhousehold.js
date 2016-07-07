'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();


router.get('/', function(req, res) {
  knex.select().from('households').then(function(data) {
    res.render('joinHousehold', {households: data});
  });
});

router.post('/:id', function(req, res) {
  knex.select('id').from('members').where('email', req.session.email).then(function(data) {
    req.session.household = 
    knex('households-members').insert([{households_id: req.params.id, members_id: data[0].id}]).then(function(data) {
      res.redirect('/');
    })
  });
});
module.exports = router;
