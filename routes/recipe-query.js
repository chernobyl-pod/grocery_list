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

    res.render('addnewrecipe', {recipe: info});
  }
}
request(options, callback);
});


router.get('/:item_id', function(req, res, next){
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
      console.log(info);
      
      res.render('addnewrecipe', {ingredients: info});
    } else {
      console.log(error);
      res.send("We done goofed");
    }
  }
  request(options, callback);

});



module.exports = router;
