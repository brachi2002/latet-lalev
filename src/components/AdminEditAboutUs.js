import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './AdminEditAboutUs.css';

const AdminEditAboutUs = () => {
  const [user] = useAuthState(auth);
  const [aboutUs, setAboutUs] = useState({
    mission: '',
    team: '',
    involved: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAboutUs = async () => {
      const querySnapshot = await getDocs(collection(db, 'aboutUs'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
      setAboutUs({
        mission: data.mission,
        team: data.team,
        involved: data.involved,
      });
    };

    fetchAboutUs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutUs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, 'aboutUs', 'aboutUsDoc'); // Use your specific document ID
      await updateDoc(docRef, {
        mission: aboutUs.mission,
        team: aboutUs.team,
        involved: aboutUs.involved,
      });
      alert('About Us updated successfully');
      navigate('/admin/dashboard'); // Navigate back to admin dashboard
    } catch (error) {
      console.error('Error updating About Us: ', error);
      alert('Failed to update About Us');
    }
  };

  return (
    <div className="admin-edit-about-us">
      <header className="admin-header">
        <h1>Edit About Us</h1>
        {user && (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={() => navigate('/')} className="homepage-button">Go to Homepage</button>
            <button onClick={() => navigate('/admin/dashboard')} className="dashboard-button">Go to Admin Home</button>
          </>
        )}
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          Mission:
          <textarea name="mission" value={aboutUs.mission} onChange={handleChange} />
        </label>
        <label>
          Team:
          <textarea name="team" value={aboutUs.team} onChange={handleChange} />
        </label>
        <label>
          Get Involved:
          <textarea name="involved" value={aboutUs.involved} onChange={handleChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default AdminEditAboutUs;
