import React, { useState, useEffect } from 'react';
import "../assets/home.css";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/fetchcomplaints')
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) => console.error('Error fetching complaints:', error));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    fetch(`http://localhost:3000/api/fetchcomplaints/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((updatedComplaint) => {
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint._id === updatedComplaint._id ? updatedComplaint : complaint
          )
        );
      })
      .catch((error) => console.error('Error updating status:', error));
  };

  return (
    <div className="container">
      <h1 className="title">Cases Reported</h1>
      <br />
      <hr />
      <br />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {complaints.map((complaint) => (
          <div key={complaint._id} className="card">
            <h2>{complaint.crimeType} - {complaint.date}</h2>
            <div className="card-details">
              {complaint.crimeLocation && (
                <p><strong>Location:</strong> {complaint.crimeLocation}</p>
              )}
              {complaint.suspectDescription && (
                <p><strong>Suspect Description:</strong> {complaint.suspectDescription}</p>
              )}
              {complaint.witnessName && (
                <p><strong>Witness Name:</strong> {complaint.witnessName}</p>
              )}
              {complaint.witnessContact && (
                <p><strong>Witness Contact:</strong> {complaint.witnessContact}</p>
              )}
              {complaint.witnessDescription && (
                <p><strong>Witness Description:</strong> {complaint.witnessDescription}</p>
              )}
              {complaint.victimName && (
                <p><strong>Victim Name:</strong> {complaint.victimName}</p>
              )}
              {complaint.victimContact && (
                <p><strong>Victim Contact:</strong> {complaint.victimContact}</p>
              )}
              {complaint.victimDescription && (
                <p><strong>Victim Description:</strong> {complaint.victimDescription}</p>
              )}
              {complaint.otherDescription && (
                <p><strong>Other Description:</strong> {complaint.otherDescription}</p>
              )}
              <p><strong>Status:</strong> {complaint.status}</p>
            </div>
            <div className="status-buttons">
              <button
                className={`status-btn ${complaint.status === 'Case Accepted' ? 'active' : ''}`}
                onClick={() => handleStatusChange(complaint._id, 'Case Accepted')}
              >
                Case Accepted
              </button>
              <button
                className={`status-btn ${complaint.status === 'In Process' ? 'active' : ''}`}
                onClick={() => handleStatusChange(complaint._id, 'In Process')}
              >
                In Process
              </button>
              <button
                className={`status-btn ${complaint.status === 'Action Taken' ? 'active' : ''}`}
                onClick={() => handleStatusChange(complaint._id, 'Action Taken')}
              >
                Action Taken
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
