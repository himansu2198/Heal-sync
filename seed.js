// seed.js
const mongoose = require('mongoose');
const Hospital = require('./models/Hospital'); // adjust path if needed
const hospitals = require('./seedHospitalData'); // your array from earlier

mongoose.connect('mongodb://localhost:27017/hospitaldb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Error:', err));

const seedDB = async () => {
  try {
    await Hospital.deleteMany({}); // Clear existing records
    await Hospital.insertMany(hospitals); // Insert the new ones
    console.log('✅ Hospital data seeded successfully');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    mongoose.connection.close(); // Always close connection
  }
};

seedDB();
