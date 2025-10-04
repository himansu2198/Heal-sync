// SpecializationCards.jsx
import React from 'react';

const SpecializationCards = ({ title, hospitals }) => {
  return (
    <div className="bg-gray-900 p-5 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
      <h3 className="text-lg font-bold text-blue-400 mb-3 capitalize">{title}</h3>
      <ul className="space-y-2">
        {hospitals.map((hospital, index) => (
          <li key={index} className="flex items-center text-sm">
            <span className="text-gray-400 mr-2">▹</span>
            <span>{hospital}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecializationCards;