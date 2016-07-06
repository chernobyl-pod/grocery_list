'use strict';

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.session.email) {
    knex('households').where('name', req.session.household)
    .then(function(house) {
      console.log(house);
      knex('households-food').where('households_id', house[0].id)
      .then(function(foodidlist) {
        console.log(foodidlist);
        var idlist = [];
        for(var i = 0; i < foodidlist.length; i++) {
          idlist.push(foodidlist[i].food_id);
        }
        console.log(idlist);
        knex('food').whereIn('id', idlist)
        .then(function(foods) {
          console.log(foods);
          res.render('myhouse', {groceries: foods, household: req.session.household});
        })
      })
    })
  } else {
    res.render('home');
  }
});

module.exports = router;
3305900259
