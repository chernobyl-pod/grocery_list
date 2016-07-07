'use strict';

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/:recipe', function(req, res) {
  req.session.recipe = req.params.recipe;
  res.redirect('/addnewrecipe');
})

module.exports = router;
