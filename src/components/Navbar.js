import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from './images/LOGO1.jpg';
import { useTranslation } from 'react-i18next';
import Profile from './Profile';

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
      <div className="left-container">
        <button className="donate-button" onClick={handleDonateClick}>{t('donate')}</button>
      </div>
      <nav className="center-container">
        <ul className="navbar-links">
          <li><button onClick={handleContactClick} className="link-button">{t('contact_us')}</button></li>
          <li><button onClick={handleVolunteerClick} className="link-button">{t('volunteer')}</button></li>
          <li><Link to="/events" className="link-button">{t('events')}</Link></li>
          <li><Link to="/services" className="link-button">{t('services')}</Link></li>
          <li><Link to="/ourStory" className="link-button">{t('our_story')}</Link></li>
          {user && isAdmin && (
            <li><Link to="/admin" className="link-button">{t('manage')}</Link></li>
          )}
        </ul>
      </nav>
      <div className="right-container">
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
        <Profile user={user} handleSignOut={handleSignOut} />
        <img src={logo} alt="Home" className="logo" onClick={handleHomeClick} />
       
      </div>
    </div>
  );
};

export default Navbar;
