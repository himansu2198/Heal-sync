import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

const MapWithHospitals = ({ hospitals }) => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY' // 🔁 Replace with your key
  });

  const defaultCenter = hospitals.length
    ? hospitals[0].location
    : { lat: 20.5937, lng: 78.9629 }; // India center fallback

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '500px' }}
      center={defaultCenter}
      zoom={12}
    >
      {hospitals.map((hospital, idx) => (
        <Marker
          key={idx}
          position={hospital.location}
          onClick={() => setSelectedHospital(hospital)}
        />
      ))}

      {selectedHospital && (
        <InfoWindow
          position={selectedHospital.location}
          onCloseClick={() => setSelectedHospital(null)}
        >
          <div>
            <h3>{selectedHospital.name}</h3>
            <p>{selectedHospital.address}</p>
            <p><strong>Contact:</strong> {selectedHospital.contact}</p>
            <p><strong>Specializations:</strong> {selectedHospital.specializations.join(', ')}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
};

export default MapWithHospitals;
