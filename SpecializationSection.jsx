// src/components/SpecializationSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const specializationData = {
  oncology: ["Apollo Cancer Centers", "Tata Memorial Hospital", "Medanta Cancer Institute"],
  cardiology: ["Max Heart Institute", "Fortis Escorts Heart Institute", "Narayana Hrudayalaya"],
  neurology: ["NIMHANS", "Max Institute of Neurosciences", "Kokilaben Hospital"],
  orthopedics: ["AIIMS Orthopedics", "Artemis Hospital", "Fortis Bone & Joint"],
  pediatrics: ["Rainbow Children's Hospital", "Apollo Cradle", "Fortis La Femme"],
  dermatology: ["Kaya Skin Clinic", "SkinNova Clinic", "Dr. Batra's Clinic"]
};

const SpecializationSection = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Search by <span className="text-blue-400">Specialization</span>
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Find hospitals specializing in your specific medical needs.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(specializationData).map(([title, hospitals], index) => (
          <motion.div
            key={title}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            <h3 className="text-xl font-bold capitalize mb-4 text-blue-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {title.replace('_', ' ')}
            </h3>
            <ul className="space-y-3">
              {hospitals.map((hospital, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">🏥</span>
                  <span className="text-gray-300">{hospital}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpecializationSection;