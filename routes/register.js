'use strict';

var express = require('express');
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');
var router = express.Router();
var Checkit = require('checkit');


router.get('/', function(req, res) {
  res.render('register', {match: true, message: ''});
});

router.post('/', function(req, res, next) {

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


  if (validEmail(req.body.email)) {
    if (validPassword(req.body.password, req.body.repeater)) {
      if (req.body.password !== "") {
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
          });
        });
      }
      else {
        res.render('register', {match: false, message: 'Please enter a password.'});
      }
    }
    else {
      res.render('register', {match: false, message: 'Passwords don\'t match. Please try again.'});
    }
  }
  else {
    res.render('register', {match: false, message: 'Please enter a valid Email address.'});
  }
});




module.exports = router;

function validEmail(str) {
  str = str.split('');
  if (str.indexOf('@') !== -1) {
    if (str.lastIndexOf('.') > str.indexOf('@')) {
      return true;
    }
  }
  return false;
}

function validPassword(str1, str2) {
  if (str1 === str2) {
    return true;
  }
  return false;
}
