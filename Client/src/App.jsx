import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Existing components
;
import Home from './components/ui/Home';
import NavbarPage from './pages/NavbarPage';
import Formyt from "@/components/ui/Formyt";
import OfficialLogin from './components/ui/OfficialsAuth';
import Complaint from './components/ui/CrimeRegister';
import Login from '@/components/ui/UserLogin'
// App.js or wherever you are importing it
import { ComplaintProvider } from './pages/Complaintcontext';

// Additional components
import { Card } from './components/ui/card';
import { Button } from '@/components/ui/button';
import PoliceNavbar from './pages/PoliceNavbar';
import CrimeAnalysis from '@/components/ui/crimeAnalysis'
// Main App component
function App() {
  return (
    <Router>
      <ComplaintProvider>
      <Routes>
        
        {/* New Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register/individual" element={<Formyt />} />
        <Route path="/navbar" element={<NavbarPage />} />
        <Route path="/login/official" element={<OfficialLogin />} />
        <Route path="/login/individual" element={<Login />} />
      
        <Route path="/policenavbar" element={<PoliceNavbar />} />
        
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/complaintanalysis" element={<CrimeAnalysis />} />
       
      </Routes>
      </ComplaintProvider>
    </Router>
  );
}

export default App;
