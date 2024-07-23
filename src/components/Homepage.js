import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './homepage.css';
import ContactForm from './ContactForm';
import Donations from './Donations';
import Navbar from './Navbar';
import { scroller } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import VolunteerPopup from './VolunteerPopup';
import { Helmet } from 'react-helmet';
import { FaPlay, FaPause } from 'react-icons/fa';
import logo from './images/2-LOGO-PARA-WEB-SITE.png';

function Homepage() {
  const { t, i18n } = useTranslation(); // הוספת i18n
  const [showDonations, setShowDonations] = useState(false);
  const [user] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [backgroundType, setBackgroundType] = useState('');
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const fetchBackgroundData = async () => {
      try {
        const docRef = doc(db, 'settings', 'background');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBackgroundType(docSnap.data().backgroundType);
          setBackgroundUrl(docSnap.data().backgroundUrl);
        }
      } catch (error) {
        console.error('Error fetching background data:', error);
      }
    };

    fetchBackgroundData();
  }, []);

  useEffect(() => {
    const checkAdminAndVolunteer = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().isAdmin);
          setIsVolunteer(userDoc.data().isVolunteer === 'true');
        }
      }
    };
    checkAdminAndVolunteer();
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

  const togglePlayPause = () => {
    const video = document.getElementById('background-video');
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const navigateToAboutUs = () => {
    navigate('/ourStory');
  };

  return (
    <div className={`App ${i18n.language === 'he' ? 'rtl' : ''}`}>
      <Helmet>
        <title>{t('home_page_title')}</title> {/* עדכון עם פונקציית t */}
      </Helmet>
      <header className="App-header">
        <Navbar user={user} isAdmin={isAdmin} />

        {!showDonations && (
          <div className="banner">
            {backgroundType === 'video' && backgroundUrl && (
              <>
                <video
                  autoPlay
                  loop
                  muted
                  className="background-video"
                  id="background-video"
                >
                  <source src={backgroundUrl} type="video/mp4" />
                  {t('video_not_supported')}
                </video>
                <button className="video-overlay" onClick={togglePlayPause}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </>
            )}
            {backgroundType === 'image' && backgroundUrl && (
              <div
                className="background-image"
                style={{
                  backgroundImage: `url(${backgroundUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center'
                }}
              ></div>
            )}
          </div>
        )}
      </header>
      <main>
        <div className="message-text">
          <img src={logo} alt="Logo" className="logo" />
          <h1>{t('title')}</h1>
          <h2>{t('subtitle')}</h2>
          <p>{t('paragraph1')}</p>
          <p>{t('paragraph2')}</p>
          <p>{t('paragraph3')}</p>
          <p>{t('paragraph4')}</p>
          <button onClick={navigateToAboutUs}>{t('read_more')}</button>
        </div>
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
        {isVolunteer && (
          <div className="show-popup" onClick={() => setShowPopup(true)}>
            <span className="show-popup-text">{t('volunteers_messages')}</span>
          </div>
        )}
        <VolunteerPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      </main>
    </div>
  );
}

export default Homepage;

