import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut, getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './homepage.css';
import ContactForm from './ContactForm';
import Donations from './Donations';
import Navbar from './Navbar'; // הוספת הניווט
import { animateScroll as scroll, scroller } from 'react-scroll';
import { useTranslation } from 'react-i18next';//a

function Homepage() {
  const { t } = useTranslation(); //a
  const [showDonations, setShowDonations] = useState(false);
  const [user] = useAuthState(auth);
  const location = useLocation(); // Correctly assign useLocation to a variable
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };

    checkAdmin();
  }, [user]);

  useEffect(() => {
    if (location.state && location.state.scrollToContact) {
      scroller.scrollTo('contact-section', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
  }, [location]);

  
  return (
    <div className="App">
      <Navbar
        user={user}
        isAdmin={isAdmin}
      />
      <header className="App-header">
        {!showDonations && (
          <div className="banner">
            <h1>{t('how_can_we_help_you')}</h1>
            <input type="text" placeholder={t('search')} className="search-input" />
            <div className="search-categories">
            <h2>{t('search_by_community_type')}</h2>
              <div className="categories">
                <button>{t('volunteers')}</button>
                <button>{t('seniors')}</button>
                <button>{t('children')}</button>
                <button>{t('people_with_disabilities')}</button>
                <button>{t('families_of_patients')}</button>
                <button>{t('mental_health')}</button>
                <button>{t('cancer_patients')}</button>
              </div>
              <h2>{t('search_by_service_type')}</h2>
              <div className="services">
                <button>{t('free_ambulance_services')}</button>
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