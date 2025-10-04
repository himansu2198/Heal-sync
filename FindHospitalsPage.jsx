import React, { useState } from 'react';
import axios from 'axios';
import MapWithHospitals from '../components/MapWithHospitals';

const HospitalSelectionPage = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [hospitals, setHospitals] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/hospitals', {
        params: { city, state, specialization }
      });
      setHospitals(res.data);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Find Hospitals Near You</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <input className="border p-2" placeholder="City" onChange={(e) => setCity(e.target.value)} />
        <input className="border p-2" placeholder="State" onChange={(e) => setState(e.target.value)} />
        <select className="border p-2" onChange={(e) => setSpecialization(e.target.value)}>
          <option value="">All Specializations</option>
          <option value="Cancer">Cancer</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2" onClick={handleSearch}>Search</button>
      </div>

      {hospitals.length > 0 ? (
        <MapWithHospitals hospitals={hospitals} />
      ) : (
        <p>No hospitals found. Try searching with different filters.</p>
      )}
    </div>
  );
};

export default HospitalSelectionPage;

