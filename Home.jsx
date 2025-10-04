// src/pages/Home.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeatureGrid from '../components/FeatureGrid';
import SpecializationSection from '../components/SpecializationSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import StatsSection from '../components/StatsSection';
import ServicesSection from '../components/ServicesSection';

const Home = () => {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <HeroSection />
      
      <motion.section 
        id="stats"
        className="py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <StatsSection />
      </motion.section>
      
      <motion.section 
        id="about"
        className="py-16 bg-gray-800"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <AboutSection />
      </motion.section>
      
      <motion.section 
        id="services"
        className="py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <ServicesSection />
      </motion.section>
      
      <motion.section 
        id="features"
        className="py-16 bg-gray-800"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <FeatureGrid />
      </motion.section>
      
      <motion.section 
        id="specializations"
        className="py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <SpecializationSection />
      </motion.section>
      
      <motion.section 
        id="testimonials"
        className="py-16 bg-gray-800"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <Testimonials />
      </motion.section>
      
      <Footer />
    </div>
  );
};

export default Home;