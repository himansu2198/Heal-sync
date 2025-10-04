const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: String,
  price: Number,
  stock: Number,
  description: String
});

module.exports = mongoose.model('Medicine', medicineSchema);