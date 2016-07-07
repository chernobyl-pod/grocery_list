'use strict';

var express = require('express');
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');
var router = express.Router();
var checkit = require('checkit');


router.get('/', function(req, res) {
  res.render('register');
});

router.post('/', function(req, res, next) {
  var checkit = new Checkit({
    email: ['required', 'email'],
    password: 'required'
  });

  var body = {
    email: req.body.email,
    password: req.body.password
  };

  checkit.run(body).then(function(validated) {
    console.log(validated);
  }).catch(Checkit.Error, function(err) {
    console.log(err.toJSON());
  });


  req.session = {
    email: req.body.email,
    name: req.body.username
  };
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      knex('members').insert({name: req.body.username, email: req.body.email, password: hash})
      .then(function(data){
        res.redirect('addhousehold');
      }).catch(next);
    })
  })

});




module.exports = router;
