// src/components/StatsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    { value: '5,000+', label: 'Active Doctors', color: 'text-blue-400' },
    { value: '1.2M+', label: 'Patients Served', color: 'text-green-400' },
    { value: '50K+', label: 'Medicines Available', color: 'text-purple-400' },
    { value: '24/7', label: 'Support Available', color: 'text-yellow-400' },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className={`text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
            <div className="text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;