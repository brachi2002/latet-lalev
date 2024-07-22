import React from 'react';
import './AboutUs.css';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const AboutUs = ({ isAdmin }) => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  return (
    <div>
      <Navbar
        user={user}
        isAdmin={isAdmin}
      />
      <div className="about-us">
        <div className="about-us-header">
          <h1>{t('about_us')}</h1>
          <p>{t('our_mission_description')}</p>
        </div>
        <div className="about-us-content">
          <div className="about-us-section">  
            <img src="./images/your-image2.jpg" alt={t('our_mission')} />
            <div className="about-us-text">
              <h2>{t('our_mission')}</h2>
              <p>{t('our_mission_text')}</p>
            </div>
          </div>

          <div className="about-us-section">
            <img src="./images/your-image2.jpg" alt={t('our_team')}/>
            <div className="about-us-text">
              <h2>{t('our_team')}</h2>
              <p>{t('our_team_text')}</p>
            </div>
          </div>

          <div className="about-us-section">
            <img src="./images/your-image3.jpg" alt={t('get_involved')} />
            <div className="about-us-text">
              <h2>{t('get_involved')}</h2>
              <p>{t('get_involved_text')}</p>
            </div>
          </div>
        </div>

        <section className="image-section">
          <div className="image-item">
            <Link to="/endorsement">
              <button>{t('agreements')}</button>
            </Link>
          </div>
          <div className="image-item">
            <Link to="/rabbi">
              <button>{t('rabbi_of_the_association')}</button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
