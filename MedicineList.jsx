import React from 'react';

const MedicineList = ({ medicines }) => {
  if (!medicines || medicines.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No medicines found.</p>;
  }

  return (
    <div className="grid gap-4 mt-6 px-4 md:grid-cols-2">
      {medicines.map((med, idx) => (
        <div key={idx} className="bg-white p-4 shadow rounded border">
          <h2 className="text-lg font-semibold">{med.name}</h2>
          <p className="text-sm text-gray-600">Company: {med.company}</p>
        </div>
      ))}
    </div>
  );
};

export default MedicineList;
