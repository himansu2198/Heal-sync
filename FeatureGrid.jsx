// src/components/FeatureGrid.jsx
import React from 'react';
import { motion } from 'framer-motion';

const features = [
  { 
    title: 'Smart Disease Search', 
    description: 'Find information about diseases and treatments with our intelligent search engine.',
    icon: '🔍'
  },
  { 
    title: 'Real-time Medicine Stock', 
    description: 'Check medicine availability in nearby pharmacies in real-time.',
    icon: '📦'
  },
  { 
    title: 'Symptom Checker', 
    description: 'Get AI-powered preliminary diagnosis based on your symptoms.',
    icon: '🧠'
  },
  { 
    title: 'Doctor Scheduling', 
    description: 'Book appointments with doctors based on their availability.',
    icon: '📅'
  },
  { 
    title: 'Email/SMS Alerts', 
    description: 'Receive timely reminders for appointments and medication.',
    icon: '📧'
  },
  { 
    title: 'Nearest Hospitals', 
    description: 'Locate hospitals with emergency services and specialist doctors.',
    icon: '🏥'
  },
  { 
    title: 'PDF Reports', 
    description: 'Download and share your medical reports in PDF format.',
    icon: '📄'
  },
  { 
    title: 'Role-Based Access', 
    description: 'Secure access control for patients, doctors, and administrators.',
    icon: '🔐'
  }
];

const FeatureGrid = () => {
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
          Powerful <span className="text-blue-400">Features</span>
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Everything you need for a seamless healthcare experience in one platform.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              y: -5,
              borderColor: '#3b82f6',
              transition: { duration: 0.3 }
            }}
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;