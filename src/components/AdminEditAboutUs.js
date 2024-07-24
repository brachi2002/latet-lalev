import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteField, getDoc } from 'firebase/firestore';
import { db, auth, storage } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import './AdminEditAboutUs.css';

const AdminEditAboutUs = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [images, setImages] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [imageType, setImageType] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    const fetchImages = async () => {
      try {
        const docRef = doc(db, 'aboutUs', 'images');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setImages(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchImages();
  }, [user, navigate]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (newImage && imageType) {
      const storageRef = ref(storage, `images/${newImage.name}`);
      await uploadBytes(storageRef, newImage);
      const url = await getDownloadURL(storageRef);

      const docRef = doc(db, 'aboutUs', 'images');
      await updateDoc(docRef, {
        [`${imageType}Image`]: url,
      });

      setImages(prev => ({ ...prev, [`${imageType}Image`]: url }));
      setNewImage(null);
      setImageType('');
    }
  };

  const handleDelete = async (type) => {
    const docRef = doc(db, 'aboutUs', 'images');
    const imageUrl = images[`${type}Image`];

    if (imageUrl) {
      await updateDoc(docRef, {
        [`${type}Image`]: deleteField(),
      });

      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      setImages(prev => {
        const newImages = { ...prev };
        delete newImages[`${type}Image`];
        return newImages;
      });
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
      <div className="image-list">
        {Object.keys(images).map((key) => (
          key.endsWith('Image') && images[key] ? (
            <div key={key} className="image-item">
              <div className="image-label">{key.replace('Image', '')}</div>
              <img src={images[key]} alt={key} />
              <button onClick={() => handleDelete(key.replace('Image', ''))}>Delete</button>
            </div>
          ) : null
        ))}
      </div>
      <div className="upload-section">
        <select value={imageType} onChange={(e) => setImageType(e.target.value)}>
          <option value="">Select Image Type</option>
          <option value="mission">Mission</option>
          <option value="team">Team</option>
          <option value="involved">Involved</option>
          <option value="endorsement">Endorsement</option>
          <option value="rabbi">Rabbi</option>
        </select>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default AdminEditAboutUs;
