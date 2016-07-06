'use strict';

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.session.email) {
    knex('households').where('name', req.session.household)
    .then(function(house) {
      knex('households-food').where('households_id', house[0].id)
      .then(function(foodidlist) {
        var idlist = [];
        for(var i = 0; i < foodidlist.length; i++) {
          idlist.push(foodidlist[i].food_id);
        }
        knex('food').whereIn('id', idlist)
        .then(function(foods) {
          res.render('myhouse', {groceries: foods, household: req.session.household});
        })
      })
    })
  } else {
    res.render('home');
  }
});

module.exports = router;
