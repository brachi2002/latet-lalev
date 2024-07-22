import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, getDocs, addDoc, getDoc, doc } from 'firebase/firestore';
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
      setMessages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!isVolunteer) return null;

  return (
    <div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-popup" onClick={() => setShowPopup(false)}>X</button>
            <h3>Volunteer Messages</h3>
            <ul>
              {messages.map(msg => (
                <li key={msg.id}>
                  <p>{msg.content}</p>
                  <button onClick={() => handleAcceptMission(msg.id)}>Accept Mission</button>
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
