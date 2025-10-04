import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientInfo, setPatientInfo] = useState(null);
  const [medicines, setMedicines] = useState([]); // now fetched live

  useEffect(() => {
    const fetchPatientData = async () => {
      const phone = localStorage.getItem('phoneNumber');
      const name = localStorage.getItem('patientName');
      const token = localStorage.getItem('token');
      if (name) setPatientInfo({ name });

      if (!phone) {
        setLoading(false);
        return;
      }

      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`http://localhost:3000/api/appointments/${phone}`, { headers });
        setAppointments(res.data || []);
      } catch (err) {
        console.error('❌ Error fetching appointments:', err);
        if (err.response && err.response.status === 401) {
          navigate('/login');
          return;
        }
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchMedicines = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/medicines');
        console.log('medicines:', res.data); // <-- debug
        setMedicines(res.data || []);
      } catch (err) {
        console.error('Failed to fetch medicines:', err);
        setMedicines([]);
      }
    };
    fetchPatientData();
    fetchMedicines();
  }, [navigate]);

  // Navigate to order page with selected medicine
  const handleOrder = (med) => {
    navigate(`/order/${med._id}`, { state: { medicine: med } });
  };

  // Build a simple CSV from appointments & medicines and trigger download
  const downloadCSVReport = () => {
    const rows = [];
    rows.push(['HealSync Patient Report']);
    rows.push([]);
    rows.push(['Patient Name', patientInfo?.name || 'N/A']);
    rows.push(['Generated At', new Date().toISOString()]);
    rows.push([]);

    rows.push(['Appointments']);
    rows.push(['Patient', 'Doctor', 'Date', 'Slot', 'Status', 'Contact']);
    (appointments || []).forEach((a) => {
      rows.push([
        a.patientName || '',
        a.doctorName || '',
        a.date || '',
        a.slot || '',
        a.status || '',
        a.phoneNumber || a.phone || ''
      ]);
    });
    rows.push([]);

    rows.push(['Medicines']);
    rows.push(['Name', 'Manufacturer', 'Price', 'Stock', 'Description', 'LowStock']);
    (medicines || []).forEach((m) => {
      rows.push([
        m.name || '',
        m.manufacturer || '',
        m.price != null ? m.price : '',
        m.stock != null ? m.stock : '',
        (m.description || '').replace(/\r?\n|\r/g, ' '),
        m.stock != null && m.stock < 20 ? 'YES' : 'NO'
      ]);
    });

    // Convert rows to CSV string
    const csv = rows.map(r =>
      r.map(cell => {
        if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',')
    ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `healsync_report_${(patientInfo?.name || 'user').replace(/\s+/g, '_')}_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Download JSON report
  const downloadJSONReport = () => {
    const payload = {
      generatedAt: new Date().toISOString(),
      patient: { name: patientInfo?.name || null },
      appointments: appointments || [],
      medicines: medicines || []
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `healsync_report_${(patientInfo?.name || 'user').replace(/\s+/g, '_')}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Build and download PDF report
  const downloadPDFReport = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    let y = 40;

    doc.setFontSize(18);
    doc.text('HealSync Patient Report', margin, y);
    y += 24;

    doc.setFontSize(11);
    doc.text(`Patient: ${patientInfo?.name || 'N/A'}`, margin, y);
    y += 16;
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
    y += 18;

    // Appointments table
    const apptColumns = ['Patient', 'Doctor', 'Date', 'Slot', 'Status', 'Contact'];
    const apptRows = (appointments || []).map(a => [
      a.patientName || '',
      a.doctorName || '',
      a.date || '',
      a.slot || '',
      a.status || '',
      a.phoneNumber || a.phone || ''
    ]);

    if (apptRows.length) {
      const res = autoTable(doc, {
        startY: y,
        head: [apptColumns],
        body: apptRows,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 45, 50] },
        margin: { left: margin, right: margin }
      });
      y = (res && res.finalY) ? res.finalY + 16 : (doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 16 : y + 200);
    } else {
      doc.text('No appointments available.', margin, y);
      y += 18;
    }

   

    const filename = `healsync_report_${(patientInfo?.name || 'user').replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    doc.save(filename);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome{patientInfo?.name ? `, ${patientInfo.name}` : ''}</h1>
            <p className="text-gray-400 mt-1">Your appointments and available medicines</p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={downloadPDFReport}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-white text-sm"
            >
              Download Report (PDF)
            </button>
          </div>
        </header>

        <section className="mb-8">
          <motion.div className="bg-gray-800 border border-gray-700 rounded-xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>

            {loading ? (
              <div className="py-8 text-center">Loading appointments...</div>
            ) : appointments.length === 0 ? (
              <div className="py-8 text-center text-gray-400">No appointments found.</div>
            ) : (
              <div className="space-y-4">
                {appointments.map((a) => (
                  <div key={a._id || a.id || `${a.patientName}-${a.date}`} className="bg-gray-750 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
                    <div>
                      <div className="font-medium">{a.patientName || 'Unknown'}</div>
                      <div className="text-sm text-gray-400">{a.date || 'N/A'} • {a.slot || 'N/A'}</div>
                    </div>
                    <div className="text-sm text-green-300">Confirmed</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </section>

        <section>
          <motion.div className="bg-gray-800 border border-gray-700 rounded-xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="text-xl font-bold mb-4">Available Medicines</h2>
            <div className="space-y-3">
              {medicines.map((m) => (
                <motion.div key={m._id} className="bg-gray-750 border border-gray-700 rounded-lg p-4 flex justify-between items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div>
                    <h3 className="font-medium">{m.name}</h3>
                    <p className="text-sm text-gray-400">{m.manufacturer} • ₹{m.price} • {m.description}</p>
                    <p className={`text-sm mt-1 ${m.stock < 20 ? 'text-red-400' : 'text-green-400'}`}>
                      {m.stock < 20 ? 'Low stock' : 'In stock'} • {m.stock} units
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleOrder(m)} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm">
                      Order
                    </button>
                  </div>
                </motion.div>
              ))}
              {medicines.length === 0 && <div className="text-gray-400">No medicines available.</div>}
            </div>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
};

export default PatientDashboard;