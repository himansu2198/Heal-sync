const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  medicineName: String,
  quantity: { type: Number, required: true },
  pricePerUnit: Number,
  totalPrice: Number,
  patientName: String,
  phone: String,
  address: String,
  paymentMethod: String,
  status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);