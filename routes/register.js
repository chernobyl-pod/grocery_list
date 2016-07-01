'use strict';

var express = require('express');
var knex = require('../db/knex');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('<h1>Hit Register Button</h1>');
});

module.exports = router;
