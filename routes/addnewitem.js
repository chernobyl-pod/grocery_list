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
  knex.select('id').from('households').where('name', req.session.household)
  .then(function(house) {
    knex('food').where('name', req.body.item_name)
    .then(function(thisfood) {
      if (thisfood[0]) {
        knex('households-food').where({households_id: house[0].id, food_id: thisfood[0].id})
        .then(function(existing) {
          if (!existing[0]) {
            knex('households-food').insert({households_id: house[0].id, food_id: thisfood[0].id})
            .then(function() {
              res.redirect('/');
            });
          }
        });
      }
      else {
        knex('food').insert({name: req.body.item_name, quantity: req.body.item_qty})
        .then(function() {
          knex.select('id').from('food').where('name', req.body.item_name)
          .then(function(food) {
            knex('households-food').insert({households_id: house[0].id, food_id: food[0].id})
            .then(function() {
              res.redirect('/');
            });
          });
        });
      }
    });
  });

});

router.post('/select', function(req, res) {
  var quantity = 1;
  knex.select('id').from('households').where('name', req.session.household)
  .then(function(house) {
    knex('food').where('name', req.body.chosen_name)
    .then(function(thisfood) {
      if (thisfood[0]) {
        knex('households-food').where({households_id: house[0].id, food_id: thisfood[0].id})
        .then(function(exists) {
          if (!exists[0]) {
            knex('households-food').insert({households_id: house[0].id, food_id: thisfood[0].id})
            .then(function() {
              res.redirect('/');
            });
          }
          res.redirect('/');
        });
      }
      else {
        knex('food').insert({name: req.body.chosen_name, quantity: quantity})
        .then(function() {
          knex.from('food').where('name', req.body.chosen_name)
          .then(function(thisfood) {
            knex('households-food').insert({households_id: house[0].id, food_id: thisfood[0].id})
            .then(function() {
              res.redirect('/');
            });
          });
        });
      }
    });
  });
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

    res.render('addnewitem', {product: info});
  }
}

request(options, callback);



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




router.post('/addnew', function(req, res, next){
  res.json({
    status: "successful",
    data: req.body
  });
});


module.exports = router;
