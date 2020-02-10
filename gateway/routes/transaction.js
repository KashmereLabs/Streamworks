var express = require('express');
var router = express.Router();
var Invoice = require('../schema/invoice');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/status', function(req, res) {
  const { tx_id } = req.query;

});

module.exports = router;
