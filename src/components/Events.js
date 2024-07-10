import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Events.css';

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);

  return (
    <div className="events">
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Events;
