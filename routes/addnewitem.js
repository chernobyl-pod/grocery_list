'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();
var request = require('request');
var url = require('url');

router.get('/', function(req, res) {
  res.render('addnewitem');
});

router.post('/add_item', function(req, res) {
  knex('food').insert({name: req.body.item_name, quantity: req.body.item_quantity});
  res.redirect('/');
});

router.post('/search_api_item', function(req, res, next){
  //console.log(req.body);
//  https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/search?number=10&offset=0&query=pasta
var options = {
  url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/search?number=" + req.body.num_results + "&offset=0&query=" + req.body.search,
  headers: {
    'X-Mashape-Key': 'WZlhmsK0m4mshHdDeHvnP8841dmdp1P8HzBjsnlXv0k9tJoybe',
    'Accept': "application/json"
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info);
  }
}

request(options, callback);


  res.render('addnewitem');
});

//
// ajax('GET', "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/search?number=" + req.body.num_results + "&offset=0&query=" + req.body.search, function(err, data){
//   console.log(data);
// });






// req.setHeader('Accept', 'application/json');
// req.setHeader('X-Mashape-Key', 'WZlhmsK0m4mshHdDeHvnP8841dmdp1P8HzBjsnlXv0k9tJoybe');
// var api_search = document.getElementById('api_search');
// api_search.addEventListener('click', ajax('GET', "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/search?number=" + req.body.num_results + "&offset=0&query=" + req.body.search, function(err, data){
//   console.log(data);
// }));







module.exports = router;
