import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import {auth, db } from '../firebase';
import Navbar from './Navbar';
import './Events.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';

function Events({isAdmin }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="App">
      <Navbar
        user={user}
        isAdmin={isAdmin}
      />
      <div className="events">
        <h2>{t('events')}</h2>
        {selectedEvent ? (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseDetails}>&times;</span>
              <h3>{selectedEvent.name}</h3>
              <p>{selectedEvent.description}</p>
              <div className="event-images">
                {selectedEvent.imageUrls && selectedEvent.imageUrls.map((url, index) => (
                  <img key={index} src={url} alt={selectedEvent.name} style={{ maxWidth: '200px', margin: '5px' }} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ul className="event-list">
            {events.map(event => (
              <li key={event.id} className="event-item">
                <div className="event-card" onClick={() => handleEventClick(event)}>
                  {event.imageUrls && event.imageUrls.length > 0 ? (
                    <img src={event.imageUrls[0]} alt={event.name} className="event-image" />
                  ) : (
                    <div className="placeholder-image">{t('no_image')}</div>
                  )}
                  <h3>{event.name}</h3>
                </div>
                <button className="info-button" onClick={() => handleEventClick(event)}>{t('more_info')}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Events;
