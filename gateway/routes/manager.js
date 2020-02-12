var express = require('express');
var router = express.Router();
var Invoice = require('../schema/invoice');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/invoices', function(req, res) {
  const { address } = req.query;
  const managerAddress = address.toLowerCase().toString();

  Invoice.find({ 'recipient_address': managerAddress }).sort({ date_created: -1 }).then(function(dataResponse) {
    res.send({ "message": "success", data: dataResponse });
  }).catch(function(err) {
    console.log("errror");
  });
});

module.exports = router;
