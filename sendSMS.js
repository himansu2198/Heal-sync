// utils/sendSMS.js
const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+91'+ to, // e.g. '+919876543210'
    });
    console.log('✅ SMS sent:', response.sid);
  } catch (error) {
    console.error('❌ SMS failed:', error);
  }
};

module.exports = sendSMS;
