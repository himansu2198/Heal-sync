// src/pages/DoctorSlotBookingPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { hospitalData } from '../utils/hospitalDoctorMapping';

const DoctorSlotBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const disease = query.get('disease');
  const hospitalName = query.get('hospital');

  const hospitals = hospitalData[disease?.toLowerCase()] || [];
  const hospital = hospitals.find(h => h.name === hospitalName);

  const handleBooking = (doctorName, slot) => {
    navigate(`/hospital?disease=${disease}&hospital=${hospitalName}&doctor=${doctorName}&slot=${slot}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">
            {hospitalName} - Doctors
          </h1>
        </div>

        {hospital?.doctors?.length === 0 ? (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium mt-4">No doctors available</h3>
            <p className="text-gray-500 mt-2">Please check back later or try another hospital</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hospital?.doctors?.map((doc, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-800 border border-gray-700 rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start mb-4">
                  <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center text-lg mr-4">
                    {doc.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{doc.name}</h2>
                    <p className="text-blue-400">{doc.specialization}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-400 mb-2">Contact:</p>
                  <p className="text-sm">{doc.email}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 mb-2">Available Slots:</p>
                  <div className="flex flex-wrap gap-2">
                    {doc.slots.map((slot, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleBooking(doc.name, slot)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {slot}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DoctorSlotBookingPage;