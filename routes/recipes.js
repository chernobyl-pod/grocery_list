'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  knex.from('households').where('households.name', req.session.household).innerJoin('households-recipes', 'households.id', 'households-recipes.households_id').innerJoin('recipes', 'recipes.id', 'households-recipes.recipes_id').select('recipes.name')
  .then(function(data) {
    console.log(data);
    res.render('recipes', {household: req.session.household, recipes: data});
  });

});

router.get('/new', function(req, res) {
  res.render('addnewrecipe');
});

router.post('/new', function(req, res) {
  var newrecipe = req.body.newrecipe.toLowerCase();
  var category = req.body.category.toLowerCase();
  knex.select('id').from('households').where('name', req.session.household)
  .then(function(house) {
    knex('recipes').where('name', newrecipe)
    .then(function(recipe) {
      if (recipe[0]) {
        knex('households-recipes').where({households_id: house[0].id, recipes_id: recipe[0].id})
        .then(function(existing) {
          console.log(existing);
          if (!existing[0]) {
            knex('households-recipes').insert({households_id: house[0].id, recipes_id: recipe[0].id})
            .then(function() {
              res.redirect('/');
            });
          }
        });
      }
      else {
        knex('recipes').insert({name: newrecipe, category: category})
        .then(function() {
          knex.select('id').from('recipes').where(name, newrecipe)
          .then(function(recipe){
            knex('households-recipes').insert({households_id: house[0].id, recipes_id: recipe[0].id})
            .then(function() {
              res.redirect('/');
            });
          });
        });
      }
    });
  });
});
module.exports = router;