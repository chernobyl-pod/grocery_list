'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();
var request = require('request');
var url = require('url');





router.post('/', function(req, res, next){
  console.log(req.body);

// https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?excludeIngredients=coconut&intolerances=egg%2C+gluten&limitLicense=false&number=10&offset=0&query=burger&type=main+course
var options = {
  url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?intolerances=" + req.body.allergies + "&limitLicense=false&number=" + req.body.numrecipes + "&offset=0&query=" + req.body.recipename + "&type=main+course",
  headers: {
    'X-Mashape-Key': 'WZlhmsK0m4mshHdDeHvnP8841dmdp1P8HzBjsnlXv0k9tJoybe',
    'Accept': "application/json"
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);

    res.render('addnewrecipe', {recipe: info, household: req.session.household});
  }
}
request(options, callback);
});


router.get('/:name/:item_id', function(req, res, next){
  var options = {
    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + req.params.item_id + "/analyzedInstructions?stepBreakdown=true",
    headers: {
      'X-Mashape-Key': 'WZlhmsK0m4mshHdDeHvnP8841dmdp1P8HzBjsnlXv0k9tJoybe',
      'Accept': "application/json"
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      var ingredients = [];
      for (var i = 0; i < info[0].steps[0].ingredients.length; i++) {
        ingredients.push(firstLetter(info[0].steps[0].ingredients[i].name));
      }
      var ingob = [];
      for (var i = 0; i < ingredients.length; i++) {
        ingob.push({name: ingredients[i], quantity: 1});
      }
      knex('households').where('name', req.session.household)
      .then(function(house) {
        knex('food').insert(ingob)
        .then(function() {
          knex('recipes').where('name', req.params.name)
          .then(function(recipeexists) {
            if (recipeexists[0]) {
              knex('housholds-recipes').insert([{households_id: house[0].id, recipes_id: recipeexists[0].id}])
              .then(function() {
                knex('food').whereIn('name', ingredients)
                .then(function(foods) {
                  var ingredList = [];
                  for (var i = 0; i < foods.length; i++) {
                    ingredList.push({recipes_id: recipeexists[0].id, food_id: foods[i].id})
                  }
                  knex('recipes-food').insert(ingredList)
                  .then(function() {
                    res.redirect('/recipes');
                  })
                })
              })
            }
            else {
              knex('recipes').insert([{name: req.params.name}])
              .then(function() {
                knex('recipes').where('name', req.params.name)
                .then(function(recipe) {
                  knex('households-recipes').insert([{households_id: house[0].id, recipes_id: recipe[0].id}])
                  .then(function() {
                    knex('food').whereIn('name', ingredients)
                    .then(function(foods) {
                      var ingredList = [];
                      for (var i = 0; i < foods.length; i++) {
                        ingredList.push({recipes_id: recipe[0].id, food_id: foods[i].id})
                      }
                      knex('recipes-food').insert(ingredList)
                      .then(function() {
                        res.redirect('/recipes');
                      })
                    })
                  })

                })
              })
            }
          });
        })
      });
    } else {
      console.log(error);
      res.send("We done goofed");
    }
  }
  request(options, callback);

});

function firstLetter(str) {
  str = str.split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].split('');
    str[i][0] = str[i][0].toUpperCase();
    str[i] = str[i].join('');
  }
  return str.join(' ');
}

module.exports = router;
