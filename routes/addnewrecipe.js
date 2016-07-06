'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();

router.post('/', function(req, res) {
  knex('recipes').insert([{name: req.body.recipe_name, category: req.body.recipe_style, allergies: req.body.recipe_allergies, preferred_diet: req.body.recipe_preferred_diet, course: req.body.recipe_course}])
  .then(function() {
    req.session.recipe = req.body.recipe_name;
    res.render('createrecipe', {recipe: req.body.recipe_name, ingredients: []});
  });
});

router.get('/', function(req, res) {
  knex('recipes').where('name', req.session.recipe)
  .then(function(recipe) {
    knex('recipes-food').where('recipes_id', recipe[0].id)
    .then(function(ingreds) {
      var ingrids = [];
      for (var i = 0; i < ingreds.length; i++) {
        ingrids.push(ingreds[i].food_id);
      }
      knex('food').whereIn('id', ingrids)
      .then(function(foods) {
        var foodlist = [];
        for (var i = 0; i < foods.length; i++) {
          foodlist.push(foods[i].name);
        }
        res.render('createrecipe', {recipe: req.session.recipe, ingredients: foodlist});
      });
    });
  });
});

router.post('/addingredient', function(req, res) {
  knex('food').where('name', req.body.ingredient)
  .then(function(food) {
    if (food[0]) {
      knex('recipes').where('name', req.session.recipe)
      .then(function(recipe) {
        knex('recipes-food').insert([{recipes_id: recipe[0].id, food_id: food[0].id}])
        .then(function() {
          res.redirect('/addnewrecipe');
        });
      });
    }
    else {
      knex('food').insert([{name: req.body.ingredient}])
      .then(function() {
        knex('recipes').where('name', req.session.recipe)
        .then(function(recipe) {
          knex('food').where('name', req.body.ingredient)
          .then(function(food) {
            knex('recipes-food').insert([{recipes_id: recipe[0].id, food_id: food[0].id}])
            .then(function() {
              res.redirect('/addnewrecipe/');
            });
          });
        });
      });
    }
  });
});

router.post('/submit', function(req, res) {
  knex('households').where('name', req.session.household)
  .then(function(house) {
    knex('recipes').where('name', req.session.recipe)
    .then(function(recipe) {
      knex('households-recipes').insert([{households_id: house[0].id, recipes_id: recipe[0].id}])
      .then(function() {
        res.redirect('/recipes');
      });
    });
  });
});
module.exports = router;
