import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from './Navbar';
import './Events.css';

function Events({ user, handleSignOut, handleDonateClick, handleHomeClick, handleVolunteerClick, handleContactClick, isAdmin }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'EventList'));
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList.reverse()); // reverse the list to show the latest events at the top
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
        handleSignOut={handleSignOut}
        handleDonateClick={handleDonateClick}
        handleHomeClick={handleHomeClick}
        handleVolunteerClick={handleVolunteerClick}
        handleContactClick={handleContactClick}
        isAdmin={isAdmin}
      />
      <div className="events">
        <h2>Events</h2>
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
                    <div className="placeholder-image">No Image</div>
                  )}
                  <h3>{event.name}</h3>
                </div>
                <button className="info-button" onClick={() => handleEventClick(event)}>More Info</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Events;
