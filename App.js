import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DiseaseSearchPage from './pages/DiseaseSearchPage';
import HospitalSelectionPage from './pages/HospitalSelectionPage';
import DoctorSlotBookingPage from './pages/DoctorSlotBookingPage';
import { AuthProvider, useAuth } from './AuthContext';
import DoctorPrescriptionPage from './pages/DoctorPrescriptionPage';
import OrderPage from './pages/OrderPage'; // new

const ProtectedRoute = ({ role, children }) => {
  const { userRole } = useAuth();
  return userRole === role ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/disease-search" element={<DiseaseSearchPage />} />
          <Route path="/hospitals" element={<HospitalSelectionPage />} />
          <Route path="/book-doctor" element={<DoctorSlotBookingPage />} />
          <Route path="/doctor/prescription" element={<DoctorPrescriptionPage />} />
          <Route path="/order/:id" element={<OrderPage />} />


          {/* Protected routes */}
          <Route path="/patient" element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
