const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  email: String  , 
  slots: [String],
});

const hospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  image: String,
  specializations: [String],
  doctors: [doctorSchema],
});

module.exports = mongoose.model('Hospital', hospitalSchema);
