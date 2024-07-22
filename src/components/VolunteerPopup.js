import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, addDoc, getDoc, doc, query, where } from 'firebase/firestore';
import './VolunteerPopup.css';

const VolunteerPopup = ({ showPopup, setShowPopup }) => {
  const [authUser, loading, error] = useAuthState(auth);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authUser) {
        const userDoc = await getDoc(doc(db, 'users', authUser.uid));
        if (userDoc.exists() && userDoc.data().isVolunteer === 'true') {
          setIsVolunteer(true);
        }
      }
    };

    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(db, 'messages'));
      const allMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Filter out messages that have been accepted by the current user
      const acceptedMessagesQuery = query(collection(db, 'missions'), where('userId', '==', authUser.uid));
      const acceptedMessagesSnapshot = await getDocs(acceptedMessagesQuery);
      const acceptedMessageIds = acceptedMessagesSnapshot.docs.map(doc => doc.data().messageId);

      const filteredMessages = allMessages.filter(msg => !acceptedMessageIds.includes(msg.id));
      setMessages(filteredMessages);
    };

    if (authUser) {
      fetchUserData();
      fetchMessages();
    }
  }, [authUser]);

  const handleAcceptMission = async (messageId) => {
    if (authUser) {
      await addDoc(collection(db, 'missions'), {
        messageId,
        userId: authUser.uid,
        userEmail: authUser.email,
        status: 'pending',
        createdAt: new Date(),
      });

      alert('You have accepted the mission. Await admin approval.');

      // Remove the accepted message from the list
      setMessages(messages.filter(msg => msg.id !== messageId));
    }
  };

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    }
    return '';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!isVolunteer) return null;

  return (
    <div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-popup" onClick={() => setShowPopup(false)}></button>
            <h3>Volunteer Messages</h3>
            <ul className="messages-list">
              {messages.map(msg => (
                <li key={msg.id} className="message-item">
                  <p>{msg.content}</p>
                  <p><small>{formatDate(msg.createdAt)}</small></p>
                  <button className="accept-button" onClick={() => handleAcceptMission(msg.id)}>Accept Mission</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerPopup;
