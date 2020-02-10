var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/streamworks');

var db = mongoose.connection;

var userSchema = new mongoose.Schema({
  email: String,
  address: String,
  invoices: Number,
  description: String,
  label: String,
});

var Invoice = mongoose.model('User', userSchema);

module.exports = Invoice;
