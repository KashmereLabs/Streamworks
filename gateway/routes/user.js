var express = require('express');
var router = express.Router();
var invoice = require('../schema/invoice');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/invoice', function(req, res) {
  const { address, type, } = req.body;
  var Invoice = new invoice(req.body);
  Invoice.save({}).then(function(dataResponse) {
    res.send({ "message": "success" });
  });
});

module.exports = router;
