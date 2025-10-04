import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DiseaseSearchPage = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const disease = query.get('disease');

  const criticalDiseases = ['cancer', 'tumor', 'fracture', 'chestpain', 'seizure'];
  const isCritical = criticalDiseases.includes(disease?.toLowerCase());

  const medicineMap = {
    fever: [
      { name: 'Paracetamol', company: 'Cipla' },
      { name: 'Combiflam', company: 'Sanofi' },
    ],
    diabetes: [
      { name: 'Metformin', company: 'Sun Pharma' },
      { name: 'Glycomet', company: 'USV' },
    ],
    cold: [
    { name: 'Cetirizine', company: 'Dr. Reddy’s' },
    { name: 'Sinarest', company: 'Centaur' },
  ],
  cough: [
    { name: 'Benadryl', company: 'Johnson & Johnson' },
    { name: 'Ascoril', company: 'Glenmark' },
  ],
  headache: [
    { name: 'Saridon', company: 'Piramal' },
    { name: 'Disprin', company: 'Reckitt' },
  ],
  allergy: [
    { name: 'Allegra', company: 'Sanofi' },
    { name: 'Levocetirizine', company: 'GSK' },
  ],
  acidity: [
    { name: 'Digene', company: 'Abbott' },
    { name: 'Pantoprazole', company: 'Dr. Reddy’s' },
  ],
  
  };

  const medicines = medicineMap[disease?.toLowerCase()] || [];

  return (
    <div className="min-h-screen px-6 py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center">
      {disease ? (
        isCritical ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              {disease.toUpperCase()} is a critical condition
            </h2>
            <p className="mb-6 text-lg">Please consult a hospital directly for immediate help.</p>
            <button
              onClick={() => navigate('/hospitals')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold shadow"
            >
              View Hospitals
            </button>
          </div>
        ) : (
          <div className="w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Search Results for: <span className="text-blue-500">{disease}</span>
            </h2>

            {medicines.length > 0 ? (
              <div className="space-y-4">
                {medicines.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 border rounded-md shadow-sm bg-gray-100 dark:bg-gray-800"
                  >
                    <h3 className="text-xl font-semibold">{m.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Company: {m.company}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                No medicines found for this disease.
              </p>
            )}

            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate('/hospitals')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold shadow"
              >
                Need Hospital?
              </button>
            </div>
          </div>
        )
      ) : (
        <p className="text-lg text-center">No disease selected.</p>
      )}
    </div>
  );
};

export default DiseaseSearchPage;
