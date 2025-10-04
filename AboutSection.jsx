// src/components/AboutSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center">
        <motion.div 
          className="w-full md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            About <span className="text-blue-400">HealSync</span>
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            HealSync is a revolutionary healthcare platform that connects patients, doctors, pharmacies, and hospitals in a unified ecosystem.
          </p>
          <p className="text-lg text-gray-300 mb-8">
            Our mission is to democratize access to quality healthcare through technology, making it faster, more efficient, and accessible to everyone.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <motion.div 
              className="bg-blue-900/50 text-blue-300 px-4 py-2 rounded-full text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Real-time Availability
            </motion.div>
            <motion.div 
              className="bg-green-900/50 text-green-300 px-4 py-2 rounded-full text-sm"
              whileHover={{ scale: 1.05 }}
            >
              AI-Powered Diagnostics
            </motion.div>
            <motion.div 
              className="bg-purple-900/50 text-purple-300 px-4 py-2 rounded-full text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Secure & Private
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500 rounded-2xl blur opacity-20"></div>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 shadow-lg">
                <div className="bg-gray-800 h-40 rounded-lg mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="text-center text-white">Hospital Network</div>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 shadow-lg mt-8">
                <div className="bg-gray-800 h-40 rounded-lg mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="text-center text-white">Secure Records</div>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 shadow-lg">
                <div className="bg-gray-800 h-40 rounded-lg mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-center text-white">Appointment Scheduling</div>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-700 shadow-lg mt-8">
                <div className="bg-gray-800 h-40 rounded-lg mb-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-center text-white">24/7 Availability</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;