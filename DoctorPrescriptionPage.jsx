import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DoctorPrescriptionPage = () => {
  const [form, setForm] = useState({
    patientName: '',
    age: '',
    gender: '',
    symptoms: '',
    disease: '',
    medicines: '',
    advice: '',
    nextVisit: '',
    doctorName: '',
  });

  const pdfRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 280);
      pdf.save(`Prescription_${form.patientName}.pdf`);
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Doctor Prescription Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase())}
            className="p-3 rounded border"
          />
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={generatePDF}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded"
        >
          Generate PDF
        </button>
      </div>

      {/* Hidden section to convert to PDF */}
      <div className="mt-10 p-6 bg-white shadow rounded max-w-2xl mx-auto" ref={pdfRef}>
        <h2 className="text-xl font-bold text-center mb-4">HealSync Healthcare</h2>
        <p><strong>Patient Name:</strong> {form.patientName}</p>
        <p><strong>Age/Gender:</strong> {form.age}, {form.gender}</p>
        <p><strong>Symptoms:</strong> {form.symptoms}</p>
        <p><strong>Diagnosed Disease:</strong> {form.disease}</p>
        <p><strong>Medicines:</strong><br /> {form.medicines}</p>
        <p><strong>Diet Advice:</strong><br /> {form.advice}</p>
        <p><strong>Next Visit:</strong> {form.nextVisit}</p>
        <p className="mt-6"><strong>Doctor:</strong> Dr. {form.doctorName}</p>
        <p className="mt-2 text-sm text-gray-500">Generated via HealSync System</p>
      </div>
    </div>
  );
};

export default DoctorPrescriptionPage;
