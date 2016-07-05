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
  console.log("Hello");
  knex.select('id').from('members').where('name', req.session.name).then(function(data) {
    console.log(data, req.params.id);
    knex('households-members').insert([{households_id: req.params.id, members_id: data[0].id}]).then(function(data) {
      res.redirect('/');
    })
  });
});
module.exports = router;
