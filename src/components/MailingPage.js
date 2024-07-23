import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { sendMail } from '../sendMail'; // Import the function to send emails
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';
import './MailingPage.css';

const MailingPage = ({ isAdmin }) => {
  const [user] = useAuthState(auth);
  const [emails, setEmails] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userEmails = querySnapshot.docs.map(doc => doc.data().email);
      setEmails(userEmails);
    };

    fetchEmails();
  }, []);

  const handleSendMail = async () => {
    if (!subject || !message) {
      alert('Please provide both subject and message.');
      return;
    }

    setSending(true);
    try {
      await sendMail(emails, subject, message);
      alert('Emails sent successfully!');
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Failed to send emails.');
    }
    setSending(false);
  };

  return (
    <div>
      <Helmet>
        <title>Mailing Page | Latet lalev</title>
      </Helmet>
      <Navbar user={user} isAdmin={isAdmin} />
      <div className="mailing-page">
        <h1>Send Emails to All Users</h1>
        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject"
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter email message"
          />
        </div>
        <button onClick={handleSendMail} disabled={sending}>
          {sending ? 'Sending...' : 'Send Emails'}
        </button>
      </div>
    </div>
  );
};

export default MailingPage;
