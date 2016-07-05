'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  console.log(req.session);
  res.render('recipes', {household: req.session.household});
});

router.get('/new', function(req, res) {
  res.render('addnewrecipe');
});

router.post('/new', function(req, res) {
  knex('recipes').where({name: req.body.recipename.toLowerCase()}).then(function(data) {
    if (data[0]) {
      knex('households').where({name: req.session.household}).then(function(moredata) {
        knex('households-recipes').insert({households_id: moredata[0].id, recipes_id: data[0].id}).then(function() {
          console.log(moredata);
          console.log(data);
          res.redirect('/');
        });
      });
    } else {
      knex('recipes').insert({name: req.body.recipename.toLowerCase(), category: req.body.category.toLowerCase()})
      }
    }
  });
});

module.exports = router;
