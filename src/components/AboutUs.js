import React from 'react';
import './AboutUs.css';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';

const AboutUs = ({ isAdmin }) => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  return (
    <div>
      <Helmet>
        <title>Our story | Latet lalev</title>
      </Helmet>
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
            <img src="https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2Fvolentiring.jpg?alt=media&token=d5b4d1b1-7b3e-402c-8a24-aac594c8b260" alt={t('our_mission')} />
            <div className="about-us-text">
              <h2>{t('our_mission')}</h2>
              <p>{t('our_mission_text')}</p>
            </div>
          </div>

          <div className="about-us-section">
            <img src="https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2Fvolentiring.jpg?alt=media&token=d5b4d1b1-7b3e-402c-8a24-aac594c8b260" alt={t('our_team')}/>
            <div className="about-us-text">
              <h2>{t('our_team')}</h2>
              <p>{t('our_team_text')}</p>
            </div>
          </div>

          <div className="about-us-section">
            <img src="https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2Fdonate.webp?alt=media&token=39d10522-f1d6-4c57-93a0-b02ef2f125c5" alt={t('get_involved')} />
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
