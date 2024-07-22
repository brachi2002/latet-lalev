import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Messages.css';

const Messages = () => {
  const [authUser] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(db, 'messages'));
      setMessages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    await addDoc(collection(db, 'messages'), {
      content: newMessage,
      createdAt: new Date(),
      author: authUser.email,
    });

    setNewMessage('');
    const querySnapshot = await getDocs(collection(db, 'messages'));
    setMessages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  return (
    <div className="messages">
      <h3>Messages</h3>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>
            <p>{msg.content}</p>
            <span>{new Date(msg.createdAt.seconds * 1000).toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a new message"
      ></textarea>
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Messages;
