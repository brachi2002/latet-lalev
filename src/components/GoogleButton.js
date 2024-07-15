import React from 'react';
import './GoogleButton.css';
import googlelogo from './images/googlelogo.jpeg';


const GoogleButton = ({ handleGoogleLogin }) => (
  <button className="google-button" onClick={handleGoogleLogin}>
    <img src={googlelogo} alt="Google Logo" />
    <span>GOOGLE</span>
  </button>
);

export default GoogleButton;
