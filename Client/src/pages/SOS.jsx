import React from 'react';
import styles from './SOS.module.css';

const SOS = () => {
  let email = "example@gmail.com"; // Email recipient

  // Function to handle emergency button click
  function universalEmergency() {
    window.location.href = `mailto:${email}?subject=Emergency&body=Please assist with an emergency situation!`;
  }

  // Function to handle emergency contact dialing
  function callEmergencyService(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
  }

  return (
    <>
      <div className={`container ${styles.heading}`}>
        <h2>Choose an emergency service</h2>
      </div>
      <div className={`container ${styles.services}`}>
        <div className="container text-center">
          <div className={`row row-cols-3 ${styles.outerService}`}>
            <div className="col">
              <i className="fa-solid fa-globe fa-2x"></i>
              <button onClick={universalEmergency} className="btn btn-dark">Universal emergency</button>
            </div>
            <div className="col">
              <i className="fa-solid fa-building-shield fa-2x"></i>
              <button onClick={() => callEmergencyService('100')} className="btn btn-dark">Police</button>
            </div>
            <div className="col">
              <i className="fa-solid fa-fire-extinguisher fa-2x"></i>
              <button onClick={() => callEmergencyService('101')} className="btn btn-dark">Fire Brigade</button>
            </div>
            <div className="col">
              <i className="fa-solid fa-truck-medical fa-2x"></i>
              <button onClick={() => callEmergencyService('102')} className="btn btn-dark">Ambulance</button>
            </div>
            <div className="col">
              <i className="fa-solid fa-person-dress fa-2x"></i>
              <button onClick={() => callEmergencyService('1091')} className="btn btn-dark">Women’s Helpline</button>
            </div>
            <div className="col">
              <i className="fa-solid fa-child-reaching fa-2x"></i>
              <button onClick={() => callEmergencyService('1098')} className="btn btn-dark">Child Helpline</button>
            </div>
            <div className="col">
              <i className="fa-solid fa-person-cane fa-2x"></i>
              <button onClick={() => callEmergencyService('1291')} className="btn btn-dark">Senior Citizens Helpline</button>
            </div>
            <div className="col">
              <i className="fa-solid fa-train fa-2x"></i>
              <button onClick={() => callEmergencyService('139')} className="btn btn-dark">Railway Helpline</button>
            </div>
            <div className="col">
              <i className="fa-solid fa-skull-crossbones fa-2x"></i>
              <button onClick={() => callEmergencyService('1066')} className="btn btn-dark">Anti-Poison Helpline</button>
            </div>
            <div className="col">
              <i className="fa-solid fa-computer fa-2x"></i>
              <button onClick={() => callEmergencyService('155260')} className="btn btn-dark">Cyber Crime Helpline</button>
            </div>
            <div className="col">
              <i className="fa-solid fa-gas-pump fa-2x"></i>
              <button onClick={() => callEmergencyService('1906')} className="btn btn-dark">LPG Leak Helpline</button>
            </div>
            <div className="col">
              <i className="fa-solid fa-handcuffs fa-2x"></i>
              <button onClick={() => callEmergencyService('181')} className="btn btn-dark">Human Trafficking Helpline</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SOS;
