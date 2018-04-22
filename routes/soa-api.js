var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const hello = 'world';
  res.json({ hello });
});

module.exports = router;
