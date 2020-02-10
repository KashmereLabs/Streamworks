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

router.get('/invoices', function(req, res) {
  const { address } = req.query;
  invoice.find({ 'sender_address': address.toLowerCase() }).then(function(dataResponse) {
    res.send({ "message": "success", data: dataResponse });
  });
});

router.put('/invoice', function(req, res) {
  const { id, transaction_hash, status } = req.body;
  console.log(req.body);

  invoice.findOne({ '_id': id.toString() }).then(function(invoiceDataResponse) {
    invoiceDataResponse.transaction_hash = transaction_hash;
    invoiceDataResponse.status = status;
    invoiceDataResponse.save({}).then(function(dataSave) {
      res.send({ 'message': 'success', 'data': req.body });
    });
  });
})

module.exports = router;
