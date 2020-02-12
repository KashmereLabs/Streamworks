var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/streamworks');

var db = mongoose.connection;

var invoiceSchema = new mongoose.Schema({
  recipient_address: String,
  sender_address: String,
  amount: Number,
  description: String,
  label: String,
  status: { type: String, default: 'unpaid' },
  transaction_status: { type: String, default: 'unknown' },
  transaction_hash: String,
  date_created: Date,
});

var Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
