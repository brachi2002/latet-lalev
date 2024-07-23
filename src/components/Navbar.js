import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './navbar.css';
import logo from './images/logoNew.jpg';
import { useTranslation } from 'react-i18next';
import Profile from './Profile';
import { signOut } from 'firebase/auth';
import { scroller } from 'react-scroll';
import { auth } from '../firebase';
import en from './images/en.png';
import iw from './images/iw.png';
import es from './images/es.png';
import ru from './images/ru.png';
import { FaGlobe } from 'react-icons/fa';

const Navbar = ({ user, isAdmin }) => {
  const { t, i18n } = useTranslation();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 
  const languageOptionsRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageOptions(false);
  };

  const toggleLanguageOptions = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };

  const handleClickOutside = (event) => {
    if (languageOptionsRef.current && !languageOptionsRef.current.contains(event.target)) {
      setShowLanguageOptions(false);
    }
  };

  useEffect(() => {
    if (showLanguageOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageOptions]);

  const handleDonateClick = () => {
    navigate('/donate');
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  const handleHomeClick = () => {
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
    navigate('/', { state: { scrollToContact: true } });
  };

  return (
    <div className="navbar">
      <div className="left-container">
        <button className="donate-button" onClick={handleDonateClick}>
          {t('donate')}
        </button>
      </div>
      <nav className="center-container">
        <ul className="navbar-links">
          <li>
            <button onClick={handleContactClick} className="link-button">
              {t('contact_us')}
            </button>
          </li>
          <li>
            <button onClick={handleVolunteerClick} className="link-button">
              {t('volunteer')}
            </button>
          </li>
          <li>
            <Link to="/events" className="link-button">
              {t('events')}
            </Link>
          </li>
          <li>
            <Link to="/services" className="link-button">
              {t('services')}
            </Link>
          </li>
          <li>
            <Link to="/ourStory" className="link-button">
              {t('our_story')}
            </Link>
          </li>
          {user && isAdmin && (
            <li>
              <Link to="/admin" className="link-button">
                {t('manage')}
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="right-container">
      <Profile user={user} handleSignOut={handleSignOut} />
        <div className="language-selector" ref={languageOptionsRef}>
          <button className="language-button" onClick={toggleLanguageOptions}><FaGlobe /></button>
          {showLanguageOptions && (
            <div className="language-options">
              <button onClick={() => changeLanguage('en')}>
                <img src={en} alt="English" className="flag-icon" />
                English
              </button>
              <button onClick={() => changeLanguage('he')}>
                <img src={iw} alt="עברית" className="flag-icon" />
                עברית
              </button>
              <button onClick={() => changeLanguage('es')}>
                <img src={es} alt="Español" className="flag-icon" />
                Español
              </button>
              <button onClick={() => changeLanguage('ru')}>
                <img src={ru} alt="Русский" className="flag-icon" />
                Русский
              </button>
            </div>
          )}
        </div>
        <img src={logo} alt="Home" className="logo" onClick={handleHomeClick} />
      </div>
    </div>
  );
};

export default Navbar;
