var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/streamworks');

var db = mongoose.connection;

var invoiceSchema = new mongoose.Schema({
  recipient_address: String,
  sender_address: String,
  amount: Number,
  description: String,
  label: String,
});

var Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
