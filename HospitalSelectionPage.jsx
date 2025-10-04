import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ThemeToggle from '../components/ThemeToggle';

const HospitalSelectionPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [clickedSlotIndex, setClickedSlotIndex] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patientInfo, setPatientInfo] = useState({ name: '', age: '', location: '', Phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('');

useEffect(() => {
  axios.get('http://localhost:3000/api/hospitals')
    .then(res => {
      console.log('Hospitals:', res.data);
      setHospitals(res.data);
    })
    .catch(err => console.log(err));
}, []);


  const handleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

 const handleSlotClick = (hospitalId, doctor, slotIndex) => {
  setClickedSlotIndex(`${hospitalId}-${doctor.name}-${slotIndex}`);
  setSelectedDoctor({ ...doctor, hospitalId }); // Attach hospitalId here
};


const handleConfirmAppointment = async () => {
  if (!selectedDoctor || !patientInfo.name || !patientInfo.phone || !selectedDate || !paymentMethod) {
    alert('Please fill all fields');
    return;
  }

  const slotIndex = clickedSlotIndex?.split('-')?.pop();
  const slot = selectedDoctor.slots[slotIndex];

  const payload = {
    patientName: patientInfo.name,
    phoneNumber: patientInfo.phone,
    doctorName: selectedDoctor.name,
    specialization: selectedDoctor.specialization,
    doctorEmail: selectedDoctor.email, //
    date: selectedDate.toISOString().split('T')[0],
    timeSlot: slot,
    hospitalId: selectedDoctor.hospitalId
  };

  console.log('📦 Payload to send:', payload);

  try {
    const res = await axios.post('http://localhost:3000/api/book', payload);
      if (res.data.success) {
        // ✅ Store patient info for future dashboard lookup
        localStorage.setItem('phoneNumber', patientInfo.phone);
        localStorage.setItem('patientName', patientInfo.name); // ADD THIS LINE
        
        alert(`✅ Appointment confirmed for ${patientInfo.name}! SMS sent to ${patientInfo.phone}`);
      } else {
        alert('⚠️ Appointment saved, but SMS failed.');
      }
  } catch (err) {
    console.error('Booking error:', err);
    alert('❌ Failed to book appointment. Try again.');
  }

  // Reset state
  setSelectedDoctor(null);
  setPatientInfo({ Name: '', Age: '', Location: '', Phone: '' });
  setPaymentMethod('');
};




  const filteredHospitals = hospitals.filter(h => {
    const cityMatch = selectedCity ? h.city.toLowerCase() === selectedCity.toLowerCase() : true;
    const specMatch = selectedSpecialization ? h.specializations.includes(selectedSpecialization) : true;
    return cityMatch && specMatch;
  });

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center w-full dark:text-white text-gray-900">
          🏥 Available Hospitals{selectedCity ? ` in ${selectedCity}` : ''}
        </h2>
        <div className="absolute top-4 right-6">
          <ThemeToggle />
        </div>
      </div>

      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="p-2 w-48 rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select City</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Chennai">Chennai</option>
          <option value="Kolkata">Kolkata</option>
        </select>
        <select
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          className="p-2 w-56 rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select Specialization</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Oncology (Cancer)">Oncology (Cancer)</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Neurology">Neurology</option>
          <option value="Gynecology">Gynecology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Pediatrics">Pediatrics</option>
        </select>
      </div>

      {filteredHospitals.length === 0 ? (
        <p className="text-center">No hospitals found for selected city/specialization.</p>
      ) : (
        filteredHospitals.map((h, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 shadow-md">
   <div className="w-full rounded mb-4 overflow-hidden" style={{ height: '40em' }}>
  <img
    src={h.image}
    alt={h.name}
    className="object-cover w-full h-full"
  />
</div>




            <h3 className="text-xl font-semibold text-black dark:text-white">{h.name}</h3>
            <p><strong>Address:</strong> {h.address}</p>
            <p><strong>City:</strong> {h.city}</p>
            <p><strong>Specializations:</strong> {h.specializations.join(', ')}</p>

            <button
              onClick={() => handleExpand(index)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {expanded === index ? 'Hide Doctors' : 'View Doctors'}
            </button>

            {expanded === index && (
              <div className="mt-4 bg-white dark:bg-gray-700 p-3 rounded">
                {h.doctors.map((doc, i) => (
                  <div key={i} className="mb-4">
                    <p className="text-black dark:text-white"><strong>Doctor:</strong> {doc.name}</p>
                    <p className="text-black dark:text-white"><strong>Specialization:</strong> {doc.specialization}</p>
                  <p className="text-black dark:text-white"><strong>Email:</strong> {doc.email}</p>


                    <div className="flex flex-wrap gap-3 mt-2">
                      {doc.slots.map((slot, j) => {
                        const slotKey = `${h._id}-${doc.name}-${j}`;
                        const isClicked = clickedSlotIndex === slotKey;
                        return (
                          <button
                            key={j}
                            onClick={() => handleSlotClick(h._id, doc, j)}
                            className={`px-4 py-1 rounded-full border border-gray-400 ${isClicked ? 'bg-blue-500 text-white transform -translate-y-1 shadow-lg' : 'bg-gray-200 dark:bg-gray-600'}`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">🩺 Appointment Booking with {selectedDoctor.name}</h3>
            <input type="text" placeholder="Patient Name" value={patientInfo.name} onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })} className="w-full p-2 mb-2 rounded dark:bg-gray-700 dark:text-white" />
            <input type="number" placeholder="Age" value={patientInfo.age} onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })} className="w-full p-2 mb-2 rounded dark:bg-gray-700 dark:text-white" />
            <input type="text" placeholder="Location" value={patientInfo.location} onChange={(e) => setPatientInfo({ ...patientInfo, location: e.target.value })} className="w-full p-2 mb-2 rounded dark:bg-gray-700 dark:text-white" />
            <input type="tel" placeholder="Phone Number" value={patientInfo.phone} onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })} className="w-full p-2 mb-2 rounded dark:bg-gray-700 dark:text-white" />
            <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} minDate={new Date()} dateFormat="yyyy-MM-dd" className="w-full p-2 mb-2 rounded dark:bg-gray-700 dark:text-white" />
            <p className="mb-2 text-black dark:text-white">💰 Appointment Fees: ₹400</p>

            <div className="mb-4">
              <h4 className="font-semibold mb-1 text-black dark:text-white">💳 Choose Payment Method:</h4>
              <div className="flex justify-around items-center bg-gray-100 dark:bg-gray-600 p-3 rounded">
                <button onClick={() => setPaymentMethod('Credit')} className="bg-white dark:bg-gray-700 px-3 py-1 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-500">Credit</button>
                <button onClick={() => setPaymentMethod('Debit')} className="bg-white dark:bg-gray-700 px-3 py-1 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-500">Debit</button>
                <button onClick={() => setPaymentMethod('UPI')} className="bg-white dark:bg-gray-700 px-3 py-1 rounded shadow hover:bg-gray-200 dark:hover:bg-gray-500">UPI</button>
              </div>
              {paymentMethod === 'UPI' && (
                <div className="mt-3 text-center">
                  <p className="text-black dark:text-white">Scan this QR to Pay</p>
                  <img src="/images/Qr Scan.jpg" alt="QR Scanner" className="w-32 mx-auto mt-2" />
                </div>
              )}
            </div>

            <button onClick={handleConfirmAppointment} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-2">✅ Submit Appointment</button>
            <button onClick={() => setSelectedDoctor(null)} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalSelectionPage;
