'use strict';

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
  res.render('addnewitem', {household: req.session.household});
});

router.post('/addnew', function(req, res) {
  var toAdd = firstLetter(req.body.item_name);
  knex.select('id').from('households').where('name', req.session.household)
  .then(function(house) {
    knex('food').where('name', toAdd)
    .then(function(thisfood) {
      console.log(thisfood);
      if (thisfood[0]) {
        knex('households-food').where({households_id: house[0].id, food_id: thisfood[0].id})
        .then(function(existing) {
          if (!existing[0]) {
            console.log("there");
            knex('households-food').insert([{households_id: house[0].id, food_id: thisfood[0].id}])
            .then(function() {
              console.log("here");
              res.redirect('/');
            });
          }
          else {
            res.redirect('/');
          }
        });
      }
      else {

        var this2food = firstLetter(req.body.item_name);
        console.log(this2food);
        var quantity = (req.body.item_qty || 1);
        knex('food').insert({name: toAdd, quantity: quantity})
        .then(function() {
          knex.select('id').from('food').where('name', toAdd)
          .then(function(food) {
            console.log(food);
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

router.post('/search_api_item', function(req, res){
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
    if (!error && response.statusCode === 200) {
      var info = JSON.parse(body);
      console.log(info);

      res.render('addnewitem', {household: req.session.household, product: info});
    }
  }
  request(options, callback);
});

//
// ajax('GET', "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/search?number=" + req.body.num_results + "&offset=0&query=" + req.body.search, function(err, data){
//   console.log(data);
// });


  router.post('/:recipe', function(req, res) {
    knex('recipes').where('name', req.params.recipe)
    .then(function(recipe) {
      knex('recipes-food').where('recipes_id', recipe[0].id)
      .then(function(ingredients) {
        var foodids = [];
        for (var i = 0; i < ingredients.length; i++) {
          foodids.push(ingredients[i].food_id);
        }
        knex('food').whereIn('id', foodids)
        .then(function(foodlist) {
          console.log(foodlist);
          knex('households').where('name', req.session.household)
          .then(function(house) {
            knex('households-food').where('households_id', house[0].id).whereIn('food_id', foodids)
            .then(function(existing) {
              console.log(existing);
              for (i = 0; i < foodlist.length; i++) {
                for (var j = 0; j < existing.length; j++) {
                  if (existing[j].name === foodlist[i].name) {
                    foodlist.slice(foodlist.indexOf(i), 1);
                  }
                }
              }
              var toAdd = [];
              for (i = 0; i < foodlist.length; i++) {
                toAdd.push({households_id: house[0].id, food_id: foodlist[i].id});
              }
              knex('households-food').insert(toAdd)
              .then(function() {
                res.redirect('/');
              });
            });
          });
        });
      });
    });
  });


// req.setHeader('Accept', 'application/json');
// req.setHeader('X-Mashape-Key', 'WZlhmsK0m4mshHdDeHvnP8841dmdp1P8HzBjsnlXv0k9tJoybe');
// var api_search = document.getElementById('api_search');
// api_search.addEventListener('click', ajax('GET', "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/search?number=" + req.body.num_results + "&offset=0&query=" + req.body.search, function(err, data){
//   console.log(data);
// }));




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
