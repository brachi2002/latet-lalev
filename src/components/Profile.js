import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useTranslation } from 'react-i18next';
import './Profile.css';

const Profile = ({ handleSignOut }) => {
  const [user] = useAuthState(auth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { t } = useTranslation();

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="profile-container">
      <button onClick={toggleProfileMenu} className="profile-button">
        <i className="fas fa-user"></i>
      </button>
      {showProfileMenu && (
        <div className="profile-menu">
          {user ? (
            <>
              <p>{t('hi')}, {user.displayName || user.email}</p>
              <button onClick={handleSignOut} className="profile-menu-button">{t('logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="profile-menu-button">{t('login')}</Link>
              <Link to="/signup" className="profile-menu-button">{t('signup')}</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
