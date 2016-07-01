'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.end('<h1>Success!</h1>');
});

module.exports = router;
