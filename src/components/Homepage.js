import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import './homepage.css';
import ContactForm from './ContactForm';
import Donations from './Donations';

function Homepage() {
  const [showDonations, setShowDonations] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleDonateClick = () => {
    setShowDonations(true);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  const handleHomeClick = () => {
    setShowDonations(false);
    navigate('/');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-bar">
          <div className="buttons-container">
            {user ? (
              <>
                <button onClick={handleSignOut} className="logout-button">Logout</button>
                <span className="user-email">{user.email}</span>
              </>
            ) : (
              <>
                <button className="login-button"><Link to="/login">Login</Link></button>
                <button className="signup-button"><Link to="/signup">Sign Up</Link></button>
              </>
            )}
            <button className="donate-button" onClick={handleDonateClick}>Donate</button>
          </div>
          <nav>
            <ul>
              <li><button onClick={handleHomeClick} className="link-button">Home</button></li>
              <li><button onClick={() => navigate('/volunteer')} className="link-button">Volunteer</button></li>
              <li><a href="#">Communities</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Branches</a></li>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </nav>
        </div>
        {!showDonations && (
          <div className="banner">
            <h1>How Can We Help You?</h1>
            <input type="text" placeholder="Search" className="search-input" />
            <div className="search-categories">
              <h2>Search by Community Type</h2>
              <div className="categories">
                <button>Volunteers</button>
                <button>Seniors</button>
                <button>Children</button>
                <button>People with Disabilities</button>
                <button>Families of Patients</button>
                <button>Mental Health</button>
                <button>Cancer Patients</button>
              </div>
              <h2>Search by Service Type</h2>
              <div className="services">
                <button>Free Ambulance Services</button>
              </div>
            </div>
          </div>
        )}
      </header>
      <main>
        {showDonations ? (
          <Donations />
        ) : (
          <>
            <div style={{ height: '50vh' }}></div>
            <ContactForm />
          </>
        )}
      </main>
    </div>
  );
}

export default Homepage;
