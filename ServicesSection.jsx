// src/components/ServicesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Doctor Consultation',
    description: 'Book appointments with verified doctors across various specialties.',
    icon: '👨‍⚕️',
    color: 'from-blue-600 to-blue-800'
  },
  {
    title: 'Medicine Delivery',
    description: 'Get prescribed medicines delivered to your doorstep within hours.',
    icon: '💊',
    color: 'from-green-600 to-green-800'
  },
  {
    title: 'Hospital Finder',
    description: 'Locate nearby hospitals with real-time bed and specialist availability.',
    icon: '🏥',
    color: 'from-purple-600 to-purple-800'
  },
  {
    title: 'Health Records',
    description: 'Securely store and access your medical history anytime, anywhere.',
    icon: '📋',
    color: 'from-yellow-600 to-yellow-800'
  },
  {
    title: 'AI Symptom Checker',
    description: 'Get preliminary diagnosis based on your symptoms using our AI technology.',
    icon: '🤖',
    color: 'from-red-600 to-red-800'
  },
  {
    title: 'Emergency Services',
    description: 'Immediate assistance for critical situations with one-tap emergency button.',
    icon: '🚑',
    color: 'from-pink-600 to-pink-800'
  }
];

const ServicesSection = () => {
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
          Our <span className="text-blue-400">Services</span>
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Comprehensive healthcare services designed for your convenience and well-being.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`bg-gradient-to-br ${service.color} rounded-xl p-6 border border-gray-700 shadow-xl`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-gray-200">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;