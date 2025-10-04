// src/components/HeroSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const criticalDiseases = ['cancer', 'heart_attack', 'stroke', 'kidney_failure', 'tuberculosis'];

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const diseaseNames = [
    'fever', 'cold', 'cough', 'headache', 'allergy', 'acidity',
    'diabetes', 'hypertension', 'asthma', 'tuberculosis',
    'cancer', 'heart_attack', 'stroke', 'kidney_failure'
  ];

  const filteredSuggestions = diseaseNames.filter((disease) =>
    disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isCritical = criticalDiseases.includes(searchTerm.toLowerCase());

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/disease-search?disease=${searchTerm}`);
    }
  };

  const handleSuggestionClick = (suggestedDisease) => {
    setSearchTerm(suggestedDisease);
    setShowSuggestions(false);
  };

  const handleHospitalRedirect = () => {
    navigate('/hospitals');
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900/20 to-gray-900 z-0"></div>
      
      {/* Particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-400 opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center relative z-10">
        <motion.div 
          className="w-full md:w-1/2 mb-12 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Find Trusted <span className="text-blue-400">Healthcare</span> in Seconds
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Connect with doctors, find medicines, and locate hospitals - all in one platform powered by AI.
          </motion.p>
          
          <motion.div 
            className="relative w-full max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex">
              <input
                type="text"
                placeholder="Search Disease (e.g., cancer, fever...)"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="p-4 w-full rounded-l-lg bg-gray-800 text-white border border-gray-700 shadow-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearchClick}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-r-lg shadow-lg transition-all"
              >
                Search
              </button>
            </div>

            {/* Suggestion Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <motion.ul 
                className="absolute z-10 bg-gray-800 text-white w-full mt-1 rounded-lg shadow-xl max-h-48 overflow-y-auto border border-gray-700"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {filteredSuggestions.map((disease, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSuggestionClick(disease)}
                    className="px-4 py-3 hover:bg-gray-700 cursor-pointer capitalize border-b border-gray-700 last:border-b-0"
                  >
                    {disease.replace('_', ' ')}
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>
          
          {/* Critical Disease Alert */}
          {isCritical && (
            <motion.div 
              className="mt-4 text-red-300 font-semibold bg-red-900/50 px-5 py-4 rounded-lg shadow w-full max-w-xl border border-red-800"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 mt-1 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <span className="capitalize">{searchTerm.replace('_', ' ')}</span> is a <strong className="text-red-200">critical condition</strong>.<br />
                  Please consult a hospital directly for immediate help.
                  <button
                    onClick={handleHospitalRedirect}
                    className="mt-3 bg-red-700 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all"
                  >
                    Find Hospitals Near You
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500 rounded-xl blur opacity-30"></div>
            <div className="relative bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-gray-900 border-b border-gray-700 py-2 px-4 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-500 ml-4">dashboard.jsx</div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="text-blue-400 font-semibold">Doctors Online</div>
                    <div className="text-3xl font-bold mt-2">142</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="text-green-400 font-semibold">Hospitals Nearby</div>
                    <div className="text-3xl font-bold mt-2">27</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="text-purple-400 font-semibold">Medicines Available</div>
                    <div className="text-3xl font-bold mt-2">1,248</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                    <div className="text-yellow-400 font-semibold">Active Patients</div>
                    <div className="text-3xl font-bold mt-2">5,632</div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-3/4"></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">System Status: Operational</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;