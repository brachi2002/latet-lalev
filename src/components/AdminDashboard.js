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
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [newBackgroundFile, setNewBackgroundFile] = useState(null);
  const [backgroundType, setBackgroundType] = useState('image'); // Default to image

  useEffect(() => {
    const fetchBackgroundData = async () => {
      try {
        const docRef = doc(db, 'settings', 'background');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBackgroundUrl(data.backgroundUrl);
          setBackgroundType(data.backgroundType);
        }
      } catch (error) {
        console.error('Error fetching background data:', error);
      }
    };

    fetchBackgroundData();
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

  const handleFileUpload = (event) => {
    if (event.target.files[0]) {
      setNewBackgroundFile(event.target.files[0]);
    }
  };

  const handleChangeBackgroundFile = async () => {
    if (!newBackgroundFile) {
      alert('Please select a file first');
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, 'background'); // Always use the same path to replace the file

      // Upload the file
      await uploadBytes(storageRef, newBackgroundFile);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Determine the type of the background (image or video)
      const fileType = newBackgroundFile.type.startsWith('video') ? 'video' : 'image';

      // Update the Firestore document
      await updateBackgroundData(downloadURL, fileType);
      setBackgroundUrl(downloadURL);
      setBackgroundType(fileType);
    } catch (error) {
      console.error('Error updating background file:', error);
    }
  };

  const updateBackgroundData = async (url, type) => {
    const docRef = doc(db, 'settings', 'background');

    try {
      await setDoc(docRef, { backgroundUrl: url, backgroundType: type });
      alert('Background updated successfully');
    } catch (error) {
      console.error('Error updating background data:', error);
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
        <Link to="/admin/manage-qr" className="card">Manage Qr</Link>

      </div>

      <div className="background-file-update">
        <h2>Change Background</h2>
        <input type="file" accept="image/*,video/*" id="background-upload" onChange={handleFileUpload} />
        <label htmlFor="background-upload"><i className="fas fa-upload"></i>Upload File</label>
        {newBackgroundFile && <span>{newBackgroundFile.name}</span>}
        <button onClick={handleChangeBackgroundFile}>Update Background</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
