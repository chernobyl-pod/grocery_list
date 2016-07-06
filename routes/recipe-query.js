'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();
var request = require('request');
var url = require('url');





router.post('/recipe-query', function(req, res, next){
  //console.log(req.body);
  // <input type="text" name="recipename" value="Search Name">
  // <input type="number" name="numrecipes" value="">
  // <input type="text" name="allergies" value="Allergies">
  // <input type="dropdown" name="dietarypref" value="Preferred Diet">
  // <input type="text" name="genre" value="Style">
  // <input type="dropdown" name="coursetype" value="Course">
// https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?excludeIngredients=coconut&intolerances=egg%2C+gluten&limitLicense=false&number=10&offset=0&query=burger&type=main+course
var options = {
  url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?excludeIngredients" + req.body.num_results + "&offset=0&query=" + req.body.search,
  headers: {
    'X-Mashape-Key': 'WZlhmsK0m4mshHdDeHvnP8841dmdp1P8HzBjsnlXv0k9tJoybe',
    'Accept': "application/json"
  }
};


function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);

    res.render('addnewitem', {recipe: info});
  }
}

request(options, callback);



});


module.exports = router;
