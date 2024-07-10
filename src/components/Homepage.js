import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
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
    signOut(auth).then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  const handleHomeClick = () => {
    setShowDonations(false);
    navigate('/');
  };
  // Check if the user is an admin
  const isAdmin = user && user.email === 'latetbalev@gmail.com'; // replace with your admin email

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
            <li><Link to="/volunteer">Volunteer</Link></li>
              {user && isAdmin && (
                <>
                  <li><Link to="/volunteers">Volunteer List</Link></li>
                  <li><Link to="/add-volunteer-option">Add Volunteer Option</Link></li>
                  <li><Link to="/manage-events">Manage Events</Link></li>
                </>
              )}
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/branches">Branches</Link></li>
              <li><Link to="/our Story">Our Story</Link></li>
              <li><Link to="/contact Us">Contact Us</Link></li>
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
                {/* Add more buttons as needed */}
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
            <div style={{ height: '50vh' }}></div> {/* Placeholder to allow scrolling */}
            <ContactForm />
          </>
        )}
      </main>
    </div>
  );
}

export default Homepage;
