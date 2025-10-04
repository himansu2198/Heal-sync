// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Hospitals', path: '/hospitals' },
    { name: 'Services', path: '/#services' },
  ];

  // Advanced logo animations
  const logoContainerVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    initial: {
      backgroundPosition: "0% 50%",
      opacity: 1
    },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      opacity: 1,
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.05,
      textShadow: "0 0 20px rgba(96, 165, 250, 0.8)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const pulseGlowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  const floatingOrbsVariants = {
    animate: (i) => ({
      y: [0, -15, 0],
      x: [0, Math.random() * 10 - 5, 0],
      opacity: [0, 0.6, 0],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 4 + i,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: i * 0.5
      }
    })
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex flex-col md:flex-row justify-between items-center sticky top-0 z-50">
      <div className="w-full flex justify-between items-center">
        <motion.div
          variants={logoContainerVariants}
          whileHover="hover"
          className="flex items-center relative"
        >
          <Link to="/" className="text-xl font-bold text-blue-400 flex items-center relative">
            
            {/* Animated Background Glow */}
            <motion.div
              className="absolute -inset-3 rounded-full bg-gradient-to-r from-green-400/30 via-blue-400/30 to-purple-400/30 blur-lg"
              variants={pulseGlowVariants}
              animate="animate"
            />
            
            {/* Floating Orbs */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={floatingOrbsVariants}
                animate="animate"
                className={`absolute w-1 h-1 rounded-full ${i === 0 ? 'bg-green-400' : i === 1 ? 'bg-blue-400' : 'bg-purple-400'}`}
                style={{
                  left: `${20 + i * 15}px`,
                  top: `${-8 - i * 2}px`
                }}
              />
            ))}

            {/* Main Logo Text */}
            <motion.span
              className="leading-none font-bold text-3xl bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent relative z-10 px-2 py-1 rounded-lg"
              variants={textVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              style={{
                backgroundSize: "300% 100%",
                fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.02em"
              }}
            >
              HealSync
            </motion.span>

            {/* Corner Accents */}
            <motion.div
              className="absolute -top-1 -left-1 w-2 h-2 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.5
              }}
            />
            <motion.div
              className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: 1
              }}
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}

          {userRole === 'patient' && (
            <Link to="/patient" className="bg-green-900 hover:bg-green-800 text-green-300 px-4 py-1.5 rounded-full text-sm flex items-center transition-all">
              <span className="mr-1">👤</span> Patient Dashboard
            </Link>
          )}

          {userRole === 'admin' && (
            <Link to="/admin" className="bg-purple-900 hover:bg-purple-800 text-purple-300 px-4 py-1.5 rounded-full text-sm flex items-center transition-all">
              <span className="mr-1">🛠️</span> Admin Dashboard
            </Link>
          )}

          {!userRole ? (
            <Link to="/login" className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-1.5 rounded transition-all">
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-1.5 rounded transition-all"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-400 hover:text-white focus:outline-none relative z-20"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="w-full md:hidden mt-4 pb-4"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-blue-400 px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-700 pt-3 mt-2">
              {!userRole ? (
                <Link 
                  to="/login" 
                  className="block bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded text-center transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <>
                  {userRole === 'patient' && (
                    <Link 
                      to="/patient" 
                      className="block bg-green-900 hover:bg-green-800 text-green-300 px-4 py-2 rounded mb-2 text-center transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Patient Dashboard
                    </Link>
                  )}
                  
                  {userRole === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="block bg-purple-900 hover:bg-purple-800 text-purple-300 px-4 py-2 rounded mb-2 text-center transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded transition-all"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;