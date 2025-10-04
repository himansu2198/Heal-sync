// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'patient',
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div 
        className="bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Header */}
        <div className="bg-gray-800 py-6 px-8 border-b border-gray-700">
          <div className="flex items-center justify-center">
            <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Create your account</h1>
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-400 mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="John Doe"
            />
            {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-400 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="password" className="block text-gray-400 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password}</p>}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-400 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className={`relative cursor-pointer rounded-lg p-4 border ${formData.userType === 'patient' ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 bg-gray-800'}`}
                whileHover={{ scale: 1.03 }}
                onClick={() => setFormData({...formData, userType: 'patient'})}
              >
                <input
                  type="radio"
                  name="userType"
                  value="patient"
                  checked={formData.userType === 'patient'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${formData.userType === 'patient' ? 'border-blue-500' : 'border-gray-600'}`}>
                    {formData.userType === 'patient' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                  </div>
                  <div>
                    <div className="text-white font-medium">Patient</div>
                    <div className="text-gray-500 text-sm">Book appointments, order medicines</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className={`relative cursor-pointer rounded-lg p-4 border ${formData.userType === 'doctor' ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 bg-gray-800'}`}
                whileHover={{ scale: 1.03 }}
                onClick={() => setFormData({...formData, userType: 'doctor'})}
              >
                <input
                  type="radio"
                  name="userType"
                  value="doctor"
                  checked={formData.userType === 'doctor'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${formData.userType === 'doctor' ? 'border-blue-500' : 'border-gray-600'}`}>
                    {formData.userType === 'doctor' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                  </div>
                  <div>
                    <div className="text-white font-medium">Doctor</div>
                    <div className="text-gray-500 text-sm">Manage appointments, patients</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className={`w-4 h-4 rounded ${errors.agreeTerms ? 'border-red-500' : 'border-gray-600'} bg-gray-700 focus:ring-3 focus:ring-blue-600`}
                />
              </div>
              <label htmlFor="agreeTerms" className="ml-3 text-sm text-gray-400">
                I agree to the <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
              </label>
            </div>
            {errors.agreeTerms && <p className="mt-1 text-red-500 text-sm">{errors.agreeTerms}</p>}
          </div>
          
          <motion.button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </motion.button>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500">
              Already have an account?{' '}
              <a 
                href="/login" 
                className="text-blue-500 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
        
        {/* Footer */}
        <div className="bg-gray-800 py-4 px-8 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} HealSync. All rights reserved.</p>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 opacity-10">
        <div className="w-32 h-32 rounded-full bg-green-500"></div>
      </div>
      <div className="absolute bottom-10 left-10 opacity-10">
        <div className="w-48 h-48 rounded-full bg-blue-500"></div>
      </div>
    </div>
  );
};

export default Register;