const mongoose = require('mongoose');
const Medicine = require('./models/Medicine');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hospitaldb';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    const medicines = [
      { name: 'Paracetamol', manufacturer: 'ABC Pharma', price: 20, stock: 40, description: 'Pain reliever and fever reducer.' },
      { name: 'Insulin', manufacturer: 'XYZ Biotech', price: 150, stock: 10, description: 'Used to treat diabetes.' },
      { name: 'Metformin', manufacturer: 'HealthCorp', price: 40, stock: 35, description: 'Oral diabetes medicine.' },
      { name: 'Amoxicillin', manufacturer: 'MedLife', price: 60, stock: 120, description: 'Antibiotic for bacterial infections.' },
      { name: 'Atorvastatin', manufacturer: 'Wellness Labs', price: 90, stock: 18, description: 'Used to lower cholesterol.' }
    ];

    await Medicine.deleteMany({});
    await Medicine.insertMany(medicines);
    console.log('Medicines seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Seeding failed', err);
    process.exit(1);
  });