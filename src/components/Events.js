import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Navbar from './Navbar';
import Footer from './Footer'; // Import the Footer component
import './Events.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

function Events({ isAdmin }) {
  const [events, setEvents] = useState([]);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'EventList'));
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList.reverse());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events: ', error);
        setError('Error fetching events. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const toggleDetails = (id) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  if (loading) {
    return <div className="loading">{t('loading')}</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Define the new image URLs for the gallery
  const galleryImages = [
    'https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2Fgallery1.JPG?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e',
    'https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2Fgallery2.JPG?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e',
    'https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2Fgallery3.JPG?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e',
    'https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2Fgallery4.JPG?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e',
    'https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2Fgallery5.JPG?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e',
    'https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2Fgallery6.JPG?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'
  ];

  const currentEventImage = galleryImages[currentImageIndex];

  return (
    <div className="App">
      <Helmet>
        <title>Events | Latet lalev</title>
      </Helmet>
      <Navbar user={user} isAdmin={isAdmin} />
      <div className="header">
        <div className="title-background">
          <h1>{t('our_event')}</h1>
          <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#fcd4d4" fillOpacity="1" d="M0,224L48,218.7C96,213,192,203,288,208C384,213,480,235,576,229.3C672,224,768,192,864,186.7C960,181,1056,203,1152,224C1248,245,1344,267,1392,277.3L1440,288L1440,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      <div className="events">
        <ul className="event-list">
          {events.map(event => (
            <li key={event.id} className="event-item">
              <div className="event-card">
                {event.imageUrls && event.imageUrls.length > 0 ? (
                  <img src={event.imageUrls[0]} alt={event.name} className="event-image" />
                ) : (
                  <div className="placeholder-image">{t('no_image')}</div>
                )}
                <h3>{event.name}</h3>
              </div>
              <button className="info-button" onClick={() => toggleDetails(event.id)}>
                {t('more_info')}
              </button>
              {expandedEventId === event.id && (
                <div className="event-details expanded">
                  <p>{event.description}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="gallery-container">
        <h2>{t('event_gallery')}</h2>
        <div className="gallery">
          <img
            src={currentEventImage}
            alt={`Gallery image ${currentImageIndex + 1}`}
            className="current-image"
          />
          <div className="thumbnail-container">
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail-image ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer /> {/* Add Footer component here */}
    </div>
  );
}

export default Events;
