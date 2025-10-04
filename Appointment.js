const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  phoneNumber: { type: String, required: true },
  doctorName: String,
  specialization: String,
  date: String,
  timeSlot: { type: String, required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Hospital' }
});


module.exports = mongoose.model('Appointment', appointmentSchema);

