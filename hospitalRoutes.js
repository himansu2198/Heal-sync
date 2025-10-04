const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');
const Appointment = require('../models/Appointment'); // Appointment model
const sendSMS = require('../utils/sendSMS'); // Twilio utility
const sendDoctorEmail = require('../utils/sendEmail');
const Medicine = require('../models/Medicine'); // ensure this is present
const Order = require('../models/Order'); // add

// ✅ 1. GET: Filter hospitals by city and specialization
router.get('/hospitals', async (req, res) => {
  try {
    const { city, specialization } = req.query;
    const query = {};

    if (city) query.city = city;
    if (specialization) query.specializations = specialization;

    const hospitals = await Hospital.find(query);
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching hospitals' });
  }
});

// ✅ 2. POST: Book appointment → Save in DB + Send SMS
router.post('/book', async (req, res) => {
  const {
    patientName,
    phoneNumber,
    doctorName,
    specialization,
    doctorEmail , 
    date,
    timeSlot,
    hospitalId
  } = req.body;

  if (!patientName || !phoneNumber || !doctorName || !specialization || !date || !timeSlot || !hospitalId || !doctorEmail) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const newAppointment = new Appointment({
    patientName,
    phoneNumber,
    doctorName,
    specialization,
    date,
    timeSlot,
    hospitalId
  });

  try {
    await newAppointment.save();
     // Send email to doctor
    const mailMessage = `
Dear ${doctorName},

You have a new appointment request.

🧑‍🤝‍🧑 Patient: ${patientName}
📞 Phone: ${phoneNumber}
📅 Date: ${date}
⏰ Time Slot: ${timeSlot}


Please confirm this at your earliest convenience.

Regards,
HealSync
    `;

    await sendDoctorEmail(doctorEmail, 'New Appointment Request', mailMessage);

    res.status(200).json({ success: true, message: 'Appointment booked and email sent to doctor.' });
  } catch (err) {
    console.error('Booking Error:', err);
    res.status(500).json({ success: false, message: 'Failed to book appointment.' });
  }
});


// ✅ 3. GET: Fetch Appointments for a Patient (by phone)
router.get('/appointments/:phone', async (req, res) => {
  const { phone } = req.params;

  try {
    const appointments = await Appointment.find({ phoneNumber: phone });
    res.status(200).json(appointments);
  } catch (err) {
    console.error('Patient Fetch Error:', err);
    res.status(500).json({ message: 'Failed to fetch patient appointments' });
  }
});

// ✅ 4. GET: Fetch All Appointments for Admin
router.get('/appointments', async (req, res) => {
  try {
    const allAppointments = await Appointment.find().sort({ date: 1 });
    res.status(200).json(allAppointments);
  } catch (err) {
    console.error('Admin Fetch Error:', err);
    res.status(500).json({ message: 'Failed to fetch all appointments' });
  }
});

// GET all medicines
router.get('/medicines', async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ name: 1 });
    return res.json(medicines);
  } catch (err) {
    console.error('Failed to fetch medicines', err);
    return res.status(500).json({ message: 'Failed to fetch medicines' });
  }
});

// POST create order and decrement stock atomically
router.post('/orders', async (req, res) => {
  try {
    const { medicineId, quantity = 1, patientName, phone, address, paymentMethod } = req.body;
    if (!medicineId || !quantity) return res.status(400).json({ message: 'medicineId and quantity required' });

    // Atomically decrement stock only if enough stock exists
    const updatedMed = await Medicine.findOneAndUpdate(
      { _id: medicineId, stock: { $gte: quantity } },
      { $inc: { stock: -quantity } },
      { new: true }
    );

    if (!updatedMed) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const pricePerUnit = updatedMed.price || 0;
    const totalPrice = pricePerUnit * quantity;

    const order = new Order({
      medicineId,
      medicineName: updatedMed.name,
      quantity,
      pricePerUnit,
      totalPrice,
      patientName,
      phone,
      address,
      paymentMethod,
      status: 'paid' // placeholder: mark paid; integrate payment later
    });

    await order.save();

    res.status(201).json({ success: true, order, updatedMedicine: updatedMed });
  } catch (err) {
    console.error('Order creation failed', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

module.exports = router;

