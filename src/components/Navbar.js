/*
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from './images/LOGO1.jpg';
import { useTranslation } from 'react-i18next';//a


const Navbar = ({ user, handleSignOut, handleDonateClick, handleHomeClick, handleVolunteerClick, handleContactClick, isAdmin }) => (
 
  <div className="navbar">
    <div className="buttons-container">
      {user ? (
        <>
          <button onClick={handleSignOut} className="logout-button">Logout</button>
          <span className="user-email">{user.email}</span>
        </>
      ) : (
        <>
          <button className="login-button"><Link to="/login" className='navbar-link'>Login</Link></button>
          <button className="signup-button"><Link to="/signup" className='navbar-link'>Sign Up</Link></button>
        </>
      )}
      <button className="donate-button" onClick={handleDonateClick}>Donate</button>
    </div>
    <nav>
      <ul>
        {user && isAdmin && (
          <>
            <li><Link to="/admin">Manage</Link></li>
          </>
        )}
        <li><button onClick={handleContactClick} className="link-button">Contact Us</button></li>
        <li><button onClick={handleVolunteerClick} className="link-button">Volunteer</button></li>
        <li><Link to="/events" className="link-button">Events</Link></li>
        <li><Link to="/services" className="link-button">Services</Link></li>
        <li><Link to="/ourStory" className="link-button">Our Story</Link></li>
        <li>
          <Link to="/" onClick={handleHomeClick}>
          <img src={logo} alt="Home" className="logo" /></Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Navbar;
*/
/*
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from './images/LOGO1.jpg';
import { useTranslation } from 'react-i18next';

const Navbar = ({ user, handleSignOut, handleDonateClick, handleHomeClick, handleVolunteerClick, handleContactClick, isAdmin }) => {
  const { t } = useTranslation();

  return (
    <div className="navbar">
      <div className="buttons-container">
        {user ? (
          <>
            <button onClick={handleSignOut} className="logout-button">{t('logout')}</button>
            <span className="user-email">{user.email}</span>
          </>
        ) : (
          <>
            <button className="login-button"><Link to="/login" className='navbar-link'>{t('login')}</Link></button>
            <button className="signup-button"><Link to="/signup" className='navbar-link'>{t('signup')}</Link></button>
          </>
        )}
        <button className="donate-button" onClick={handleDonateClick}>{t('donate')}</button>
      </div>
      <nav>
        <ul>
          {user && isAdmin && (
            <>
              <li><Link to="/admin">{t('manage')}</Link></li>
            </>
          )}
          <li><button onClick={handleContactClick} className="link-button">{t('contact_us')}</button></li>
          <li><button onClick={handleVolunteerClick} className="link-button">{t('volunteer')}</button></li>
          <li><Link to="/events" className="link-button">{t('events')}</Link></li>
          <li><Link to="/services" className="link-button">{t('services')}</Link></li>
          <li><Link to="/ourStory" className="link-button">{t('our_story')}</Link></li>
          <li>
            <Link to="/" onClick={handleHomeClick}>
              <img src={logo} alt="Home" className="logo" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from './images/LOGO1.jpg';
import { useTranslation } from 'react-i18next';

const Navbar = ({ user, handleSignOut, handleDonateClick, handleHomeClick, handleVolunteerClick, handleContactClick, isAdmin }) => {
  const { t, i18n } = useTranslation();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageOptions(false);
  };

  const toggleLanguageOptions = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };

  return (
    <div className="navbar">
      <div className="buttons-container">
        {user ? (
          <>
            <button onClick={handleSignOut} className="logout-button">{t('logout')}</button>
            <span className="user-email">{user.email}</span>
          </>
        ) : (
          <>
            <button className="login-button"><Link to="/login" className='navbar-link'>{t('login')}</Link></button>
            <button className="signup-button"><Link to="/signup" className='navbar-link'>{t('signup')}</Link></button>
          </>
        )}
        <button className="donate-button" onClick={handleDonateClick}>{t('donate')}</button>
      </div>
      <nav>
        <ul>
          {user && isAdmin && (
            <li><Link to="/admin">{t('manage')}</Link></li>
          )}
          <li><button onClick={handleContactClick} className="link-button">{t('contact_us')}</button></li>
          <li><button onClick={handleVolunteerClick} className="link-button">{t('volunteer')}</button></li>
          <li><Link to="/events" className="link-button">{t('events')}</Link></li>
          <li><Link to="/services" className="link-button">{t('services')}</Link></li>
          <li><Link to="/ourStory" className="link-button">{t('our_story')}</Link></li>
          <li>
            <Link to="/" onClick={handleHomeClick}>
              <img src={logo} alt="Home" className="logo" />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="language-selector">
        <button className="language-button" onClick={toggleLanguageOptions}>🌐</button>
        {showLanguageOptions && (
          <div className="language-options">
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('he')}>עברית</button>
            <button onClick={() => changeLanguage('es')}>Español</button>
            <button onClick={() => changeLanguage('ru')}>Русский</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
