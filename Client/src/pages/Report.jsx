import React, { useState } from 'react';
import { useComplaints } from './ComplaintContext';

const Report = () => {
  const { addComplaint } = useComplaints();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    time: '',
    date: '',
    crimeLocation: '',
    crimeType: '',
    suspectDescription: '',
    witnessName: '',
    witnessContact: '',
    witnessDescription: '',
    victimName: '',
    victimContact: '',
    victimDescription: '',
    twitter: '',
    facebook: '',
    fullname: '',
    otherDescription: '',
    address: ''
  });
  
  const [shareWitnessInfo, setShareWitnessInfo] = useState(true);
  const [location, setLocation] = useState({ latitude: null, longitude: null, areaName: '' });

  const steps = ['General description', 'Suspect & witness details', 'Victim details', 'Evidence'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setShareWitnessInfo(!e.target.checked);
    if (e.target.checked) {
      setFormData(prevData => ({
        ...prevData,
        witnessName: '',
        witnessContact: '',
        witnessDescription: ''
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a FormData object to send files along with other data
    const formDataToSend = new FormData();
  
    // Append all form data to FormData
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
  
    // Append location data
    formDataToSend.append('location', JSON.stringify(location));
  
    // Append shareWitnessInfo
    formDataToSend.append('shareWitnessInfo', shareWitnessInfo);
  
    // Append files
    const fileInput = document.getElementById('crimeEvidence');
    if (fileInput.files) {
      for (let i = 0; i < fileInput.files.length; i++) {
        formDataToSend.append('crimeEvidence', fileInput.files[i]);
      }
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/complaints', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Complaint submitted successfully:', result);
      alert('Complaint submitted successfully!');
  
      // Add the entire form data to context
      addComplaint({
        ...formData,
        lat: location.latitude,  // Change from 'latitude' to 'lat'
        lng: location.longitude, // Change from 'longitude' to 'lng'
        location: location.areaName,
        shareWitnessInfo: shareWitnessInfo,  // Use the state variable directly
        crimeEvidence: Array.from(fileInput.files),
      });
  
      // Reset form data
      setFormData({
        time: '',
        date: '',
        crimeLocation: '',
        crimeType: '',
        suspectDescription: '',
        witnessName: '',
        witnessContact: '',
        witnessDescription: '',
        victimName: '',
        victimContact: '',
        victimDescription: '',
        twitter: '',
        facebook: '',
        fullname: '',
        otherDescription: '',
        address: ''
      });
      setCurrentStep(0);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Error submitting complaint. Please try again.');
    }
  };
  

  // const getUserLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setLocation({ latitude, longitude, areaName: '' });
  //         const area = await getAreaName(latitude, longitude);
  //         setLocation(prevLocation => ({ ...prevLocation, areaName: area }));
  //         setFormData(prevData => ({
  //           ...prevData,
  //           crimeLocation: area,
  //         }))
  //          console.log(latitude),
  //          console.log(longitude)
  //       },
        
  //       (error) => {
  //         console.error('Error getting location:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude, areaName: '' });
          
          const area = await getAreaName(latitude, longitude);
          setLocation(prevLocation => ({ ...prevLocation, areaName: area }));

          // Now we update the formData with the location
          setFormData(prevData => ({
            ...prevData,
            crimeLocation: area,
          }));

          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };


  
  
  const getAreaName = async (latitude, longitude) => {
    const url =` https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.display_name || 'Location not found';
    } catch (error) {
      console.error('Error fetching area name:', error);
      return 'Error fetching area name';
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 style={styles.heading}>Describe the crime</h2>
            <p>Time and Date of crime</p>
            <div style={styles.inputGroup}>
              <input type="time" style={styles.input} placeholder="Time of crime" name="time" value={formData.time} onChange={handleInputChange} />
            </div>
            <div style={styles.inputGroup}>
              <input type="date" style={styles.input} id='dateOfCrime' placeholder="Date of crime" name="date" value={formData.date} onChange={handleInputChange} />
            </div>
            <p>Location of crime</p>
            <div>
              <button type="button" onClick={getUserLocation}>Get Location</button>
            </div>
            <div style={styles.inputGroup}>
              <input type="text" style={styles.input} placeholder="Location of crime" name="crimeLocation" value={formData.crimeLocation} onChange={handleInputChange} />
            </div>
            <p>Type of crime</p>
            <div className={styles.inputGroup}>
              <select name="crimeType" style={styles.input} value={formData.crimeType} onChange={handleInputChange}>
                <option value="" disabled>Describe the type of crime that occurred</option>
                <option value="Theft">Theft</option>
                <option value="Burglary">Burglary</option>
                <option value="Assault">Assault</option>
                <option value="Vandalism">Vandalism</option>
                <option value="Fraud">Fraud</option>
              </select>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 style={styles.heading}>Describe suspect and witness</h2>
            <div style={styles.inputGroup}>
              <input type="text" style={styles.input} placeholder="Suspect description" name="suspectDescription" value={formData.suspectDescription} onChange={handleInputChange} />
            </div>
            <div style={styles.inputGroup}>
              <label>
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange}
                />
                I do not want to share witness information
              </label>
            </div>
            <div style={styles.inputGroup}>
              <p>Please provide the name(s) and contact information (such as phone number and email address) of any witnesses to the crime. Additionally, you may provide a brief description of what the witness(es) saw.</p>
              <input className='my-2' type="text" style={styles.input} placeholder="Witness name" name="witnessName" value={formData.witnessName} onChange={handleInputChange} disabled={!shareWitnessInfo} />
              <input className='my-2' type="text" style={styles.input} placeholder="Witness contact" name="witnessContact" value={formData.witnessContact} onChange={handleInputChange} disabled={!shareWitnessInfo} />
              <input className='my-2' type="text" style={styles.input} placeholder="Witness description" name="witnessDescription" value={formData.witnessDescription} onChange={handleInputChange} disabled={!shareWitnessInfo} />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 style={styles.heading}>Victim Information</h2>
            <div style={styles.inputGroup}>
              <p>Please provide the name(s) and contact information (such as phone number and email address) of the victim(s). Additionally, you may provide a brief description of what the victim(s) experienced.</p>
              <input className='my-2' type="text" style={styles.input} placeholder="Victim name" name="victimName" value={formData.victimName} onChange={handleInputChange} />
              <input className='my-2' type="text" style={styles.input} placeholder="Victim contact" name="victimContact" value={formData.victimContact} onChange={handleInputChange} />
              <input className='my-2' type="text" style={styles.input} placeholder="Victim description" name="victimDescription" value={formData.victimDescription} onChange={handleInputChange} />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 style={styles.heading}>Select Evidence</h2>
            <div style={styles.inputGroup}>
              <p>Please provide any evidence or additional information related to the crime. This should include photos, videos, or any other relevant documents.</p>
              <input className="form-control" style={styles.input} type="file" id="crimeEvidence" multiple />
            </div>
            <div style={styles.inputGroup}>
              <p>If you have any other information related to the crime that you think may be helpful, please provide it below.</p>
              <input type="text" style={styles.input} placeholder="Description" name="otherDescription" value={formData.otherDescription} onChange={handleInputChange} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const styles = {
    container: {
      backgroundColor: '#1f2123',
      color: '#e2e8f0',
      minHeight: '100vh',
      padding: '2rem',
    },
    reportTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    card: {
      backgroundColor: '#3F2E3E',
      borderRadius: '0.5rem',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    inputGroup: {
      marginBottom: '1rem',
    },
    input: {
      width: '100%',
      padding: '0.5rem',
      backgroundColor: '#4a5568',
      color: '#e2e8f0',
      border: 'none',
      borderRadius: '0.25rem',
    },
    stepIndicator: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '2rem',
    },
    step: {
      color: '#a0aec0',
    },
    activeStep: {
      color: '#4299e1',
    },
    completedStep: {
      color: '#48bb78',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '2rem',
    },
    button: {
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      border: 'none',
      cursor: 'pointer',
    },
    prevButton: {
      backgroundColor: '#4a5568',
      color: '#e2e8f0',
    },
    nextButton: {
      backgroundColor: '#4299e1',
      color: '#e2e8f0',
    },
    submitButton: {
      backgroundColor: '#48bb78',
      color: '#e2e8f0',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.reportTitle}>
        <h2>Report a crime</h2>
      </div>
      <div style={styles.card}>
        <form onSubmit={handleSubmit}>
          <div style={styles.stepIndicator}>
            {steps.map((step, index) => (
              <span key={index} style={{
                ...styles.step,
                ...(index === currentStep ? styles.activeStep : {}),
                ...(index < currentStep ? styles.completedStep : {}),
              }}>
                {step}
              </span>
            ))}
          </div>
          
          {/* Add this button to trigger the getUserLocation function */}
          <div style={{ marginBottom: '20px' }}>
            <button type="button" onClick={getUserLocation} style={{ ...styles.button }}>
              Get Current Location
            </button>
          </div>
          
          {renderStep()}
          
          <div style={styles.buttonGroup}>
            {currentStep > 0 && (
              <button 
                type="button" 
                style={{ ...styles.button, ...styles.prevButton }} 
                onClick={prevStep}>
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button 
                type="button" 
                style={{ ...styles.button, ...styles.nextButton }} 
                onClick={nextStep}>
                Next
              </button>
            )}
            {currentStep === steps.length - 1 && (
              <button 
                type="submit" 
                style={{ ...styles.button, ...styles.submitButton }}>
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default Report;

