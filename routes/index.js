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
          // for (var i = 0; i < foods.length; i++) {
          //   foods[i].name = firstLetter(foods[i].name);
          // }
          res.render('myhouse', {groceries: foods, household: req.session.household});
        })
      })
    })
  } else {
    res.render('home');
  }
});

// function firstLetter(str) {
//   str = str.split(' ');
//   for (var i = 0; i < str.length; i++) {
//     str[i] = str[i].split('');
//     str[i][0] = str[i][0].toUpperCase();
//     str[i] = str[i].join('');
//   }
//   return str.join(' ');
// }

module.exports = router;
