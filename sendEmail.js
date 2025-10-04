const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS  // app password
  }
});

const sendDoctorEmail = async (to, subject, message) => {
  try {
    await transporter.sendMail({
      from: `"Hospital System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: message
    });
    console.log('✅ Email sent to doctor:', to);
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
};

module.exports = sendDoctorEmail;
