// src/components/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "This app helped me book a specialist doctor and get medicine within the same day!",
    author: "Ravi Kumar",
    role: "Patient",
    delay: 0
  },
  {
    quote: "I love the medication reminders and PDF prescriptions. It's made managing my diabetes so much easier.",
    author: "Sneha Patel",
    role: "Patient",
    delay: 0.1
  },
  {
    quote: "Very easy to use — clean design and fast support. The AI symptom checker is surprisingly accurate!",
    author: "Imran Shaikh",
    role: "Patient",
    delay: 0.2
  },
  {
    quote: "As a doctor, I appreciate how HealSync streamlines my appointments and patient records.",
    author: "Dr. Ananya Sharma",
    role: "Cardiologist",
    delay: 0.3
  },
  {
    quote: "The hospital management features have reduced our admin work by 40%. Highly recommended!",
    author: "Rajiv Mehta",
    role: "Hospital Admin",
    delay: 0.4
  },
  {
    quote: "Finding critical medicines during emergencies has never been easier. This app saved my father's life.",
    author: "Priya Desai",
    role: "Patient's Family",
    delay: 0.5
  }
];

const Testimonials = () => {
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
          What Our <span className="text-blue-400">Users Say</span>
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hear from patients, doctors, and healthcare providers using HealSync.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: testimonial.delay }}
            whileHover={{ 
              y: -5,
              borderColor: '#3b82f6'
            }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center text-xl">
                {testimonial.author.charAt(0)}
              </div>
              <div className="ml-4">
                <div className="font-bold text-white">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
            <p className="text-gray-300 italic">"{testimonial.quote}"</p>
            <div className="mt-4 flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;