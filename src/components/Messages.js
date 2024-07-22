import React, { useState, useEffect } from 'react';
import { collection, doc, getDocs, getDoc, setDoc, deleteDoc, Timestamp, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Messages.css';

const Messages = () => {
  const [authUser] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(db, 'messages'));
      setMessages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const userDoc = await getDoc(doc(db, 'users', authUser.uid));

    if (userDoc.exists()) {
      const { firstName, lastName, email } = userDoc.data();

      await setDoc(doc(collection(db, 'messages')), {
        content: newMessage,
        createdAt: Timestamp.now(),
        authorEmail: email,
        authorName: `${firstName} ${lastName}`,
        acceptedBy: [],
      });

      setNewMessage('');
      const querySnapshot = await getDocs(collection(db, 'messages'));
      setMessages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } else {
      console.error('User document does not exist!');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    await deleteDoc(doc(db, 'messages', messageId));
    setMessages(messages.filter(msg => msg.id !== messageId));
  };

  const handleToggleExpand = (messageId) => {
    setExpandedMessageId(expandedMessageId === messageId ? null : messageId);
  };

  const handleSelectUser = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'volunteers', userId));
      if (userDoc.exists()) {
        setSelectedUser(userDoc.data());
      } else {
        console.log('No such document!');
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
      setSelectedUser(null);
    }
  };

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString();
    }
    return 'No date';
  };

  return (
    <div className="messages">
      <header className="admin-header">
        <h1>Language Support</h1>
        {authUser && (
          <>
            <span className="user-email">{authUser.email}</span>
            <button onClick={() => navigate('/')} className="homepage-button">Go to Homepage</button>
            <button onClick={() => navigate('/admin/dashboard')} className="dashboard-button">Go to Admin Home</button>
          </>
        )}
      </header>
      <div className="message-input">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a new message"
          className="new-message-textarea"
        ></textarea>
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
      <div className="messages-list">
        {messages.map(msg => (
          <div key={msg.id} className="message-card">
            <div className="message-content">
              <p>{msg.content}</p>
              <p><small>{formatDate(msg.createdAt)}</small></p>
              <p><small>Sent by:  ({msg.authorEmail})</small></p>
              <div className="message-actions">
                <button className="delete-button" onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                <button className="expand-button" onClick={() => handleToggleExpand(msg.id)}>
                  {expandedMessageId === msg.id ? '▲' : '▼'}
                </button>
              </div>
            </div>
            {expandedMessageId === msg.id && (
              <div className="accepted-users">
                <h4>Accepted By</h4>
                <ul>
                  {msg.acceptedBy && msg.acceptedBy.length > 0 ? (
                    msg.acceptedBy.map(user => (
                      <li key={user.userId}>
                        <p>{user.userEmail}</p>
                        <p><small>{formatDate(user.acceptedAt)}</small></p>
                        <button className="view-form-button" onClick={() => handleSelectUser(user.userId)}>View Volunteer Form</button>
                      </li>
                    ))
                  ) : (
                    <li>No users have accepted this task yet.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedUser && (
        <div className="volunteer-form-popup">
          <div className="volunteer-form-content">
            <button className="close-popup" onClick={() => setSelectedUser(null)}>X</button>
            <h4>Volunteer Form</h4>
            <p>Name: {selectedUser.firstName} {selectedUser.lastName}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Age: {selectedUser.age}</p>
            <p>City: {selectedUser.city}</p>
            <p>Gender: {selectedUser.gender}</p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Has Car: {selectedUser.hasCar ? 'Yes' : 'No'}</p>
            <p>Comments: {selectedUser.comments}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
