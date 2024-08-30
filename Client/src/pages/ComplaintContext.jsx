import React, { createContext, useState, useContext, useEffect } from 'react';

const ComplaintContext = createContext();

export const useComplaints = () => useContext(ComplaintContext);

export const ComplaintProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/fetchcomplaints')
      .then((response) => response.json())
      .then((data) => {
        setComplaints(data);

        // Log the fetched data
        console.log('Fetched Complaints Data:', data);

        // Extract latitude and longitude from each complaint
        const coords = data.map(complaint => [
          complaint.location?.latitude,
          complaint.location?.longitude
        ]).filter(coord => coord[0] && coord[1]); // Filter out invalid coordinates

        // Log extracted coordinates
        console.log('Extracted Coordinates:', coords);

        setCoordinates(coords);
      })
      .catch((error) => console.error('Error fetching complaints:', error));
  }, []);

  const getAllComplaints = () => complaints;

  return (
    <ComplaintContext.Provider value={{ complaints, coordinates, getAllComplaints }}>
      {children}
    </ComplaintContext.Provider>
  );
};
