'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  knex.from('households').where('households.name', req.session.household).innerJoin('households-recipes', 'households.id', 'households-recipes.households_id').innerJoin('recipes', 'recipes.id', 'households-recipes.recipes_id').select('recipes.name')
  .then(function(data) {
    res.render('recipes', {household: req.session.household, recipes: data});
  });

});

router.get('/new', function(req, res) {
  res.render('addnewrecipe', {household: req.session.household});
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

router.post('/delete/:recipe', function(req, res) {
  knex('households').where('name', req.session.household)
  .then(function(house) {
    knex('recipes').where('name', req.params.recipe)
    .then(function(recipe) {
      knex('households-recipes').where('households_id', house[0].id).where('recipes_id', recipe[0].id).del()
      .then(function() {
        res.redirect('/recipes');
      })
    })
  })
})
module.exports = router;
