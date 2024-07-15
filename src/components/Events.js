import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Events.css';

function Events() {
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
    <div className="events">
      <h2>Events</h2>
      {selectedEvent ? (
        <div className="event-details">
          <button onClick={handleCloseDetails}>Back to Events</button>
          <h3>{selectedEvent.name}</h3>
          <p>{selectedEvent.description}</p>
          <div className="event-images">
            {selectedEvent.imageUrls && selectedEvent.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={selectedEvent.name} style={{ maxWidth: '200px', margin: '5px' }} />
            ))}
          </div>
        </div>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id} className="event-item" onClick={() => handleEventClick(event)}>
              {event.imageUrls && event.imageUrls.length > 0 ? (
                <img src={event.imageUrls[0]} alt={event.name} className="event-image" />
              ) : (
                <div className="placeholder-image">No Image</div>
              )}
              <h3>{event.name}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Events;
