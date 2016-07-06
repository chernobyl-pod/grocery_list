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

router.post('/addingredient', function(req, res) {
  knex('food').where('name', req.body.ingredient)
  .then(function(food) {
    if (food[0]) {
      knex('recipes').where('name', req.session.recipe)
      .then(function(recipe) {
        req.session.recipe = null;
        knex('recipes-food').insert([{recipes_id: recipe[0].id, food_id: food[0].id}])
        .then(function() {
          res.redirect('/addnewrecipe');
        });
      });
    }
    else {
      knex('food').insert('name', req.body.ingredient)
      .then(function() {
        knex('recipes').where('name', req.session.recipe)
        .then(function(recipe) {
          req.session.recipe = null;
          knex('food').where('name', req.body.ingredient)
          .then(function(food) {
            knex('recipes-food').insert([{recipes_id: recipe[0].id, food_id: food[0].id}])
            .then(function() {
              res.redirect('/addnewrecipe');
            });
          });
        });
      });
    }
  });
});

module.exports = router;
