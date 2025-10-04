const hospitals = [
  // --- DELHI ---
  {
    name: 'Apollo Hospital Delhi',
    address: 'Sarita Vihar, Delhi',
    city: 'Delhi',
    image: '/images/Apollo Hospital Delhi.jpg',
    specializations: ['Cardiology', 'Oncology (Cancer)', 'Orthopedics'],
    doctors: [
      { name: 'Dr. Sharma', specialization: 'Cardiology', email: 'dr.sharma@hospitalmail.com', slots: ['10:00 AM', '11:30 AM', '3:00 PM'] },
      { name: 'Dr. Mehta', specialization: 'Oncology (Cancer)', email: 'dr.mehta@hospitalmail.com', slots: ['9:00 AM', '12:00 PM'] },
      { name: 'Dr. Arora', specialization: 'Orthopedics', email: 'dr.arora@hospitalmail.com', slots: ['2:00 PM', '4:00 PM'] },
    ],
  },
  {
    name: 'Max Super Speciality Hospital',
    address: 'Saket, Delhi',
    city: 'Delhi',
    image: '/images/Max Hospital Delhi.jpg',
    specializations: ['Neurology', 'Gynecology'],
    doctors: [
      { name: 'Dr. Kapoor', specialization: 'Neurology', email: 'dr.kapoor@hospitalmail.com', slots: ['10:30 AM', '12:30 PM'] },
      { name: 'Dr. Neha', specialization: 'Gynecology', email: 'dr.neha@hospitalmail.com', slots: ['11:00 AM', '1:00 PM'] },
    ],
  },
  {
    name: 'BLK-Max Hospital',
    address: 'Rajinder Nagar, Delhi',
    city: 'Delhi',
    image: '/images/BLK Hospital Delhi.jpg',
    specializations: ['Pediatrics', 'Dermatology'],
    doctors: [
      { name: 'Dr. Ritu', specialization: 'Pediatrics', email: 'dr.ritu@hospitalmail.com', slots: ['9:00 AM', '11:00 AM'] },
      { name: 'Dr. Verma', specialization: 'Dermatology', email: 'dr.verma@hospitalmail.com', slots: ['2:00 PM', '3:30 PM'] },
    ],
  },
  {
    name: 'Fortis Escorts Heart Institute',
    address: 'Okhla Road, Delhi',
    city: 'Delhi',
    image: '/images/Fortis Escorts Delhi.jpg',
    specializations: ['Cardiology', 'Orthopedics'],
    doctors: [
      { name: 'Dr. Sinha', specialization: 'Cardiology', email: 'dr.sinha@hospitalmail.com', slots: ['10:00 AM', '2:00 PM'] },
      { name: 'Dr. Tripathi', specialization: 'Orthopedics', email: 'dr.tripathi@hospitalmail.com', slots: ['11:30 AM', '4:00 PM'] },
    ],
  },

  // --- MUMBAI ---
  {
    name: 'Fortis Hospital Mumbai',
    address: 'Mulund West, Mumbai',
    city: 'Mumbai',
    image: '/images/Fortis Hospital Mumbai.jpg',
    specializations: ['Neurology', 'Orthopedics'],
    doctors: [
      { name: 'Dr. Desai', specialization: 'Neurology', email: 'dr.desai@hospitalmail.com', slots: ['10:30 AM', '1:00 PM'] },
      { name: 'Dr. Patel', specialization: 'Orthopedics', email: 'dr.patel@hospitalmail.com', slots: ['11:00 AM', '3:30 PM'] },
    ],
  },
  {
    name: 'Lilavati Hospital',
    address: 'Bandra West, Mumbai',
    city: 'Mumbai',
    image: '/images/Lilavati Hospital Mumbai.jpg',
    specializations: ['Cardiology', 'Gynecology'],
    doctors: [
      { name: 'Dr. Joshi', specialization: 'Cardiology', email: 'dr.joshi@hospitalmail.com', slots: ['9:00 AM', '12:00 PM'] },
      { name: 'Dr. Sneha', specialization: 'Gynecology', email: 'dr.sneha@hospitalmail.com', slots: ['1:00 PM', '3:00 PM'] },
    ],
  },
  {
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    address: 'Andheri West, Mumbai',
    city: 'Mumbai',
    image: '/images/Kokilaben Hospital Mumbai.jpg',
    specializations: ['Dermatology', 'Pediatrics'],
    doctors: [
      { name: 'Dr. Shah', specialization: 'Dermatology', email: 'dr.shah@hospitalmail.com', slots: ['10:30 AM', '12:30 PM'] },
      { name: 'Dr. Rao', specialization: 'Pediatrics', email: 'dr.rao@hospitalmail.com', slots: ['2:00 PM', '4:00 PM'] },
    ],
  },
  {
    name: 'Tata Memorial Hospital',
    address: 'Parel, Mumbai',
    city: 'Mumbai',
    image: '/images/Tata Memorial Mumbai.jpg',
    specializations: ['Oncology (Cancer)', 'Neurology'],
    doctors: [
      { name: 'Dr. Iyer', specialization: 'Oncology (Cancer)', email: 'dr.iyer@hospitalmail.com', slots: ['11:00 AM', '2:00 PM'] },
      { name: 'Dr. Nair', specialization: 'Neurology', email: 'dr.nair@hospitalmail.com', slots: ['3:00 PM', '5:00 PM'] },
    ],
  },

  // --- CHENNAI ---
  {
    name: 'Kauvery Hospital Chennai',
    address: 'Mylapore, Chennai',
    city: 'Chennai',
    image: '/images/Kauvery Hospital Chennai.jpg',
    specializations: ['Gynecology', 'Dermatology'],
    doctors: [
      { name: 'Dr. Priya', specialization: 'Gynecology', email: 'dr.priya@hospitalmail.com', slots: ['10:00 AM', '1:00 PM'] },
      { name: 'Dr. Ravi', specialization: 'Dermatology', email: 'dr.ravi@hospitalmail.com', slots: ['2:00 PM', '3:00 PM'] },
    ],
  },
  {
    name: 'Apollo Hospitals Greams Road',
    address: 'Greams Road, Chennai',
    city: 'Chennai',
    image: '/images/Apollo Hospital Chennai.jpg',
    specializations: ['Cardiology', 'Neurology'],
    doctors: [
      { name: 'Dr. Mohan', specialization: 'Cardiology', email: 'dr.mohan@hospitalmail.com', slots: ['9:30 AM', '11:30 AM'] },
      { name: 'Dr. Swathi', specialization: 'Neurology', email: 'dr.swathi@hospitalmail.com', slots: ['1:00 PM', '3:00 PM'] },
    ],
  },
  {
    name: 'MIOT International',
    address: 'Manapakkam, Chennai',
    city: 'Chennai',
    image: '/images/MIOT Hospital Chennai.jpg',
    specializations: ['Orthopedics', 'Pediatrics'],
    doctors: [
      { name: 'Dr. Kumar', specialization: 'Orthopedics', email: 'dr.kumar@hospitalmail.com', slots: ['10:00 AM', '12:30 PM'] },
      { name: 'Dr. Anita', specialization: 'Pediatrics', email: 'dr.anita@hospitalmail.com', slots: ['2:30 PM', '4:30 PM'] },
    ],
  },
  {
    name: 'SIMS Hospital',
    address: 'Vadapalani, Chennai',
    city: 'Chennai',
    image: '/images/SIMS Hospital Chennai.jpg',
    specializations: ['Dermatology', 'Oncology (Cancer)'],
    doctors: [
      { name: 'Dr. Lal', specialization: 'Dermatology', email: 'dr.lal@hospitalmail.com', slots: ['11:00 AM', '12:30 PM'] },
      { name: 'Dr. Naveen', specialization: 'Oncology (Cancer)', email: 'dr.naveen@hospitalmail.com', slots: ['3:00 PM', '5:00 PM'] },
    ],
  },

  // --- KOLKATA ---
  {
    name: 'AMRI Hospital Kolkata',
    address: 'Salt Lake, Kolkata',
    city: 'Kolkata',
    image: '/images/AMRI Hospital Kolkata.jpg',
    specializations: ['Pediatrics', 'Cardiology'],
    doctors: [
      { name: 'Dr. Banerjee', specialization: 'Pediatrics', email: 'dr.banerjee@hospitalmail.com', slots: ['9:30 AM', '11:00 AM'] },
      { name: 'Dr. Sen', specialization: 'Cardiology', email: 'dr.sen@hospitalmail.com', slots: ['10:00 AM', '12:30 PM'] },
    ],
  },
  {
    name: 'Fortis Hospital Anandapur',
    address: 'Anandapur, Kolkata',
    city: 'Kolkata',
    image: '/images/Fortis Kolkata.jpg',
    specializations: ['Neurology', 'Orthopedics'],
    doctors: [
      { name: 'Dr. Ghosh', specialization: 'Neurology', email: 'dr.ghosh@hospitalmail.com', slots: ['10:00 AM', '12:00 PM'] },
      { name: 'Dr. Das', specialization: 'Orthopedics', email: 'dr.das@hospitalmail.com', slots: ['2:00 PM', '4:00 PM'] },
    ],
  },
  {
    name: 'Ruby General Hospital',
    address: 'Kasba Golpark, Kolkata',
    city: 'Kolkata',
    image: '/images/Ruby Hospital Kolkata.jpg',
    specializations: ['Gynecology', 'Oncology (Cancer)'],
    doctors: [
      { name: 'Dr. Roy', specialization: 'Gynecology', email: 'dr.roy@hospitalmail.com', slots: ['11:30 AM', '1:30 PM'] },
      { name: 'Dr. Bhowmik', specialization: 'Oncology (Cancer)', email: 'dr.bhowmik@hospitalmail.com', slots: ['3:00 PM', '5:00 PM'] },
    ],
  },
  {
    name: 'Desun Hospital',
    address: 'Kasba, Kolkata',
    city: 'Kolkata',
    image: '/images/Desun Hospital Kolkata.jpg',
    specializations: ['Dermatology', 'Pediatrics'],
    doctors: [
      { name: 'Dr. Paul', specialization: 'Dermatology', email: 'dr.paul@hospitalmail.com', slots: ['10:00 AM', '11:30 AM'] },
      { name: 'Dr. Mukherjee', specialization: 'Pediatrics', email: 'dr.mukherjee@hospitalmail.com', slots: ['1:30 PM', '3:30 PM'] },
    ],
  },
];
