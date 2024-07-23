import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { updateDoc, collection, getDocs, arrayUnion, getDoc, doc } from 'firebase/firestore';
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
      if (authUser) {
        const querySnapshot = await getDocs(collection(db, 'messages'));
        const allMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Filter out messages that have been accepted by the current user
        const filteredMessages = allMessages.filter(msg => 
          !msg.acceptedBy?.some(accepted => accepted.authorEmail === authUser.email)
        );
        setMessages(filteredMessages);
      }
    };

    if (authUser) {
      fetchUserData();
      fetchMessages();
    }
  }, [authUser]);

  const handleAcceptMission = async (messageId) => {
    if (authUser) {
      const { email, displayName, uid } = authUser;
      const authorName = displayName || "Unnamed User"; // Fallback to a default value if displayName is not available

      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        acceptedBy: arrayUnion({
          authorEmail: email,
          authorName: authorName,
          userId: uid,
          acceptedAt: new Date(),
        }),
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
            <h3>Volunteers Messages</h3>
            <ul className="messages-list">
              {messages.map(msg => (
                <li key={msg.id} className="message-item">
                  <p>{msg.content}</p>
                  <p><small>{formatDate(msg.createdAt)}</small></p>
                  <button className="accept-button" onClick={() => handleAcceptMission(msg.id)}>I want to volunteer</button>
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
