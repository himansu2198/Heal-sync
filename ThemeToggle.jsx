// ThemeToggle.jsx
import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div
      className="relative w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full px-1 cursor-pointer transition-all duration-300"
      style={{ marginTop: '50px' }} // ⬅ lowered position
      onClick={() => setDarkMode(!darkMode)}
    >
      {/* Toggle circle */}
      <div
        className={`w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out flex items-center justify-center ${
          darkMode ? 'translate-x-8 bg-gray-900' : 'translate-x-0 bg-yellow-400'
        }`}
      >
        {darkMode ? (
          <span role="img" aria-label="moon">🌙</span>
        ) : (
          <span role="img" aria-label="sun">☀️</span>
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;

