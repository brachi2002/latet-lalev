import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './AdminDashboard.css';
import { Helmet } from 'react-helmet';

const AdminDashboard = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [newBackgroundImage, setNewBackgroundImage] = useState(null);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const docRef = doc(db, 'settings', 'background');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBackgroundImageUrl(docSnap.data().backgroundImageUrl);
        }
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchBackgroundImage();
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log('User signed out');
      navigate('/'); // Navigate to home page after sign out
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  const handleGoToHomepage = () => {
    navigate('/'); // Navigate to home page
  };

  const handleImageUpload = (event) => {
    if (event.target.files[0]) {
      setNewBackgroundImage(event.target.files[0]);
    }
  };

  const handleChangeBackgroundImage = async () => {
    if (!newBackgroundImage) {
      alert('Please select an image first');
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, 'background'); // Use 'background' as the path
      
      // Upload the image
      await uploadBytes(storageRef, newBackgroundImage);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // Update the Firestore document
      await updateBackgroundImageUrl(downloadURL);
      setBackgroundImageUrl(downloadURL);
    } catch (error) {
      console.error('Error updating background image:', error);
    }
  };

  const updateBackgroundImageUrl = async (url) => {
    const docRef = doc(db, 'settings', 'background');
    
    try {
      await setDoc(docRef, { backgroundImageUrl: url });
      alert('Background image updated successfully');
    } catch (error) {
      console.error('Error updating background image:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <Helmet>
        <title>Admin | Latet lalev</title>
      </Helmet>
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        {user && (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleSignOut} className="logout-button">Logout</button>
            <button onClick={handleGoToHomepage} className="homepage-button">Go to Homepage</button>
          </>
        )}
      </header>

      <div className="cards-container">
        <Link to="/admin/add-volunteer-option" className="card">Add Volunteer Option</Link>
        <Link to="/admin/manage-events" className="card">Manage Events</Link>
        <Link to="/admin/edit-about-us" className="card">Edit About Us</Link>
        <Link to="/admin/view-user" className="card">View User</Link>
        <Link to="/admin/view-requests" className="card">View contacts requests</Link>
        <Link to="/admin/language-support" className="card">Language Support</Link>
        <Link to="/admin/messages" className="card">Messages</Link>
      </div>

      <div className="background-image-update">
        <h2>Change Background Image</h2>
        <input type="file" accept="image/*" id="background-upload" onChange={handleImageUpload} />
        <label htmlFor="background-upload"><i className="fas fa-upload"></i>Upload File</label>
        {newBackgroundImage && <span>{newBackgroundImage.name}</span>}
        <button onClick={handleChangeBackgroundImage}>Update Background Image</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
