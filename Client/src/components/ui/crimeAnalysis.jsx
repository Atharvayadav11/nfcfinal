import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const API_BASE_URL = 'http://localhost:5000'; // Update this to your actual backend URL

const CrimeAnalysis = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [insights, setInsights] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCrimeData();
    getInsights();
  }, []);

  const fetchCrimeData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/fetchcomplaints`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCrimeData(data);
    } catch (error) {
      console.error('Error fetching crime data:', error);
      setError('Failed to fetch crime data. Please try again later.');
    }
  };

  const getInsights = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/analyze`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: crimeData })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setInsights(data.analysis);
    } catch (error) {
      console.error('Error getting insights:', error);
      setError('Failed to get insights. Please try again later.');
    }
  };

  const prepareCrimeTypeData = () => {
    const typeCounts = crimeData.reduce((acc, complaint) => {
      const crimeType = complaint.crimeType || 'Unknown';
      acc[crimeType] = (acc[crimeType] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(typeCounts).map(([type, count]) => ({ name: type, value: count }));
  };

  const prepareLocationData = () => {
    const locationCounts = crimeData.reduce((acc, complaint) => {
      const areaName = complaint.location?.areaName || 'Unknown';
      acc[areaName] = (acc[areaName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(locationCounts).map(([location, count]) => ({ name: location, value: count }));
  };

  const prepareTimeData = () => {
    return crimeData.map(complaint => ({
      date: complaint.date || 'Unknown Date',
      time: complaint.time || 'Unknown Time',
      crimeType: complaint.crimeType || 'Unknown Type'
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="crime-analysis">
      <h1>Crime Analysis Dashboard</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      {crimeData.length > 0 ? (
        <>
          <div className="chart-container">
            <h2>Crime Types Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={prepareCrimeTypeData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {prepareCrimeTypeData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h2>Crime Locations</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={prepareLocationData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h2>Crime Trends Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={prepareTimeData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="crimeType" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <p>No crime data available. Please check your data source.</p>
      )}
      
      <div className="insights">
        <h2>AI-Generated Insights</h2>
        <p>{insights || 'No insights available yet.'}</p>
      </div>
    </div>
  );
};

export default CrimeAnalysis;