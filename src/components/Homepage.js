import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './homepage.css';
import ContactForm from './ContactForm';
import Donations from './Donations';
import Navbar from './Navbar';
import { animateScroll as scroll, scroller } from 'react-scroll';

function Homepage() {
  const [showDonations, setShowDonations] = useState(false);
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        if (adminDoc.exists()) {
          setIsAdmin(true);
        }
      }
    };

    checkAdmin();
  }, [user]);

  const handleDonateClick = () => {
    setShowDonations(true);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
      navigate('/'); // Return to home page after signing out
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  const handleHomeClick = () => {
    setShowDonations(false);
    navigate('/');
  };

  const handleVolunteerClick = () => {
    if (user) {
      navigate('/volunteer');
    } else {
      navigate('/login', { state: { from: { pathname: '/volunteer' } } });
    }
  };

  const handleContactClick = () => {
    scroller.scrollTo('contact-section', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <div className="App">
      <Navbar
        user={user}
        handleSignOut={handleSignOut}
        handleDonateClick={handleDonateClick}
        handleHomeClick={handleHomeClick}
        handleVolunteerClick={handleVolunteerClick}
        handleContactClick={handleContactClick}
        isAdmin={isAdmin}
      />
      <header className="App-header">
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
            <div name="contact-section">
              <ContactForm />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Homepage;
