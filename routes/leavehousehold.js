'use strict';

var express = require('express');
var cookieSession = require('cookie-session');
var knex = require('../db/knex');
var router = express.Router();

router.post('/:household', function(req, res) {
  //remove household
});

module.exports = router;
