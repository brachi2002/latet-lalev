import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Navbar from './Navbar';
import './Events.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

function Events({ isAdmin }) {
  const [events, setEvents] = useState([]);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'EventList'));
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList.reverse());
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
    };

    fetchEvents();
  }, []);

  const toggleDetails = (id) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  const handleNext = () => {
    setGalleryIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const handlePrev = () => {
    setGalleryIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  return (
    <div className="App">
      <Helmet>
        <title>Events | Latet lalev</title>
      </Helmet>
      <Navbar user={user} isAdmin={isAdmin} />
      <div className="events">
        <h2>{t('events')}</h2>
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
        <div className="arrow" onClick={handlePrev}>&#9664;</div>
        <div className="gallery">
          {events.length > 0 && events[galleryIndex].imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Event ${galleryIndex + 1} image ${index + 1}`} />
          ))}
        </div>
        <div className="arrow" onClick={handleNext}>&#9654;</div>
      </div>
    </div>
  );
}

export default Events;
