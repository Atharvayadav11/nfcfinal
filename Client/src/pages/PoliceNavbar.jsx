import React, { useState } from 'react';
import ReportsPolice from '../pages/ReportsPolice';
import SOS from '../pages/SOS';
import Community from '../pages/Community';
import News from '../pages/News';
import ProfilePolice from '../pages/ProfilePolice';
import Map from '../pages/Map'; // Import your new Map component
import Alerts from '../pages/Alerts'; // Import Alerts component
import Departments from '../pages/Departments'; // Import Departments component
import Dashboard from '../pages/Dashboard';

function PoliceNavbar() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard />;
      case 'report':
        return <ReportsPolice />;
      case 'sos':
        return <SOS />;
      case 'community':
        return <Community />;
      case 'news':
        return <News />;
      case 'map':
        return <Map />;
      case 'profile':
        return <ProfilePolice />;
     
      
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded"
          >
            <i className="fas fa-home fa-lg"></i>
            <span>Home</span>
          </button>
          <button
            onClick={() => setCurrentPage('report')}
            className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded"
          >
            <i className="fas fa-flag"></i>
            <span>Report</span>
          </button>
        </div>
        <div className="flex space-x-4 items-center">
          <span className="badge rounded-pill badge-notification bg-success">1</span>
          <button
            onClick={() => setCurrentPage('map')}
            className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded"
          >
            <i className="fas fa-map-marker-alt"></i>
            <span>Map</span>
          </button>
          <button
            onClick={() => setCurrentPage('profile')}
            className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded"
          >
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </button>
          <span className="badge rounded-pill badge-notification bg-info">1</span>
        
         
        </div>
      </nav>
      {renderPage()}
    </div>
  );
}

export default PoliceNavbar;
