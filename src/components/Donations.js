import React from 'react';
import './Donations.css'; // Import CSS for styling
import bitQR from './images/qr-nedarim.png';
import payboxQR from './images/qr-nedarim.png';
import paypalQR from './images/qr-nedarim.png';
import nedarimPlusQR from './images/qr-nedarim.png';
import { useTranslation } from 'react-i18next';//a

const Donations = () => {
  const { t } = useTranslation();//a
  return (
    <div className="donation-container">
      <h1>Donate to Our Association</h1>
      <p>Your support is crucial for our mission. Choose a method to donate:</p>
      <div className="donation-methods">
        <div className="donation-method">
          <h2>Donate via Bit</h2>
          <a href="https://bit-link.com/donate" target="_blank" rel="noopener noreferrer">
            <img src={bitQR} alt="Bit QR Code" className="qr-code"/>
          </a>
        </div>
        <div className="donation-method">
          <h2>Donate via Paybox</h2>
          <a href="https://paybox-link.com/donate" target="_blank" rel="noopener noreferrer">
            <img src={payboxQR} alt="Paybox QR Code" className="qr-code"/>
          </a>
        </div>
        <div className="donation-method">
          <h2>Donate via PayPal</h2>
          <a href="https://paypal-link.com/donate" target="_blank" rel="noopener noreferrer">
            <img src={paypalQR} alt="PayPal QR Code" className="qr-code"/>
          </a>
        </div>
        <div className="donation-method">
          <h2>Donate via Nedarim Plus</h2>
          <a href="https://www.matara.pro/nedarimplus/online/?mosad=7006412" target="_blank" rel="noopener noreferrer">
            <img src={nedarimPlusQR} alt="Nedarim Plus QR Code" className="qr-code"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Donations;
