var express = require('express');
var router = express.Router();
var Invoice = require('../schema/invoice');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/invoices', function(req, res) {
  const { address } = req.query;
  const managerAddress = address.toString();
  console.log(managerAddress + "****");

  Invoice.find({ 'address': managerAddress }).then(function(dataResponse) {
    console.log(dataResponse);
    res.send({ "message": "success", data: dataResponse });
  }).catch(function(err) {
    console.log("errror");
  });
});

module.exports = router;
