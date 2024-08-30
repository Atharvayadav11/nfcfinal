import React, { useState } from 'react';
import Home from '../pages/Home';
import Report from '../pages/Report';
import SOS from '../pages/SOS';
import Community from '../pages/Community';
import News from '../pages/News';
import Profile from '../pages/Profile';
import Messages from '../pages/Messages';
import Map from '../pages/Map';  // Import your new Map component

function NavbarPage() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'report':
        return <Report />;
      case 'sos':
        return <SOS />;
      case 'community':
        return <Community />;
      case 'news':
        return <News />;
      case 'map':  // Add the map case here
        return <Map />;
      case 'profile':
        return <Profile />;
      case 'messages':
        return <Messages />;
      default:
        return <Home />;
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
          <button
            onClick={() => setCurrentPage('sos')}
            className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded"
          >
            <i className="fas fa-tower-broadcast"></i>
            <span>SOS</span>
          </button>
          <button
            onClick={() => setCurrentPage('community')}
            className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded"
          >
            <i className="fas fa-comments"></i>
            <span>Community</span>
          </button>
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => setCurrentPage('news')}
            className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded"
          >
            <i className="fas fa-globe-americas fa-lg"></i>
            <span>News</span>
          </button>
          <span className="badge rounded-pill badge-notification bg-success">1</span>
          <button
            onClick={() => setCurrentPage('map')}  // Add this line
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
          <button
            onClick={() => setCurrentPage('messages')}
            className="flex items-center space-x-2 hover:bg-gray-700 px-3 py-2 rounded"
          >
            <i className="fas fa-bell fa-lg"></i>
            <span>Messages</span>
          </button>
          <span className="badge rounded-pill badge-notification bg-info">1</span>
        </div>
      </nav>
      {renderPage()}
    </div>
  );
}

export default NavbarPage;
