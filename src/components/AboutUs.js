import React, { useState, useEffect } from 'react';
import './AboutUs.css';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; // Import the Footer component
import { Helmet } from 'react-helmet';
import { doc, getDoc } from 'firebase/firestore';

const AboutUs = ({ isAdmin }) => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const aboutUsDoc = await getDoc(doc(db, 'aboutUs', 'images'));
        if (aboutUsDoc.exists()) {
          setImages(aboutUsDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
    fetchImages();
  }, []);  

  return (
    <div>
      <Helmet>
        <title>Our story | Latet lalev</title>
      </Helmet>
      <Navbar user={user} isAdmin={isAdmin} />
      <div className="about-us">
        <div className="about-us-header">
          <h1>{t('about_us')}</h1>
          <p>{t('our_mission_description')}</p>
        </div>
        <div className="about-us-content">
          <div className="about-us-section">
            <img src={images.missionImage} alt={t('our_mission')} />
            <div className="about-us-text">
              <h2>{t('our_mission')}</h2>
              <p>{t('our_mission_text')}</p>
            </div>
          </div>

          <div className="about-us-section">
            <img src={images.teamImage} alt={t('our_team')} />
            <div className="about-us-text">
              <h2>{t('our_team')}</h2>
              <p>{t('our_team_text')}</p>
            </div>
          </div>

          <div className="about-us-section">
            <img src={images.involvedImage} alt={t('get_involved')} />
            <div className="about-us-text">
              <h2>{t('get_involved')}</h2>
              <p>{t('get_involved_text')}</p>
            </div>
          </div>
        </div>

        <section className="image-section">
          <div className="image-item">
            <Link to="/endorsement">
              <button style={{ backgroundImage: `url(${images.agreementsBackgroundImage})` }}>
                <span>{t('agreements')}</span>
              </button>
            </Link>
          </div>
          <div className="image-item">
            <Link to="/rabbi">
              <button style={{ backgroundImage: `url(${images.rabbiBackgroundImage})` }}>
                <span>{t('rabbi_of_the_association')}</span>
              </button>
            </Link>
          </div>
        </section>
      </div>
      <Footer /> {/* Add Footer component here */}
    </div>
  );
};

export default AboutUs;
