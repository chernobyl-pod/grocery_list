'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();

router.post('/', function(req, res) {
  knex('households').where('name', req.session.household)
  .then(function(house) {
    knex('households-food').where('households_id', house[0].id).del()
    .then(function() {
      res.redirect('/');
    })
  });
});

router.post('/:name', function(req, res) {
  knex('households').where('name', req.session.household)
  .then(function(house) {
    knex('food').where('name', req.params.name)
    .then(function(food) {
      console.log(food);
    })
  })
})

module.exports = router;
