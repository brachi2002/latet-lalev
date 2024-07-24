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
  const [rabbiImages, setRabbiImages] = useState([]);
  const [endorsementImages, setEndorsementImages] = useState([]);
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
          const data = docSnap.data();
          setImages(data);
          setRabbiImages(data.rabbi || []);
          setEndorsementImages(data.agreements || []);
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
      const storageRef = ref(storage, `${imageType}/${newImage.name}`);
      await uploadBytes(storageRef, newImage);
      const url = await getDownloadURL(storageRef);

      const docRef = doc(db, 'aboutUs', 'images');
      const docSnap = await getDoc(docRef);
      let updatedImages;

      if (docSnap.exists()) {
        updatedImages = { ...docSnap.data() };
        if (Array.isArray(updatedImages[imageType])) {
          updatedImages[imageType].push(url);
        } else {
          updatedImages[imageType] = url;
        }
      } else {
        updatedImages = { [imageType]: Array.isArray(updatedImages[imageType]) ? [url] : url };
      }

      await updateDoc(docRef, updatedImages);

      if (imageType === 'rabbi') {
        setRabbiImages((prevImages) => [...prevImages, url]);
      } else if (imageType === 'agreements') {
        setEndorsementImages((prevImages) => [...prevImages, url]);
      } else {
        setImages((prevImages) => ({ ...prevImages, [imageType]: url }));
      }

      setNewImage(null);
      setImageType('');
    }
  };

  const handleDelete = async (imageUrl, type) => {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);

    const docRef = doc(db, 'aboutUs', 'images');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const updatedImages = { ...docSnap.data() };
      if (Array.isArray(updatedImages[type])) {
        updatedImages[type] = updatedImages[type].filter((url) => url !== imageUrl);
      } else {
        delete updatedImages[type];
      }
      await updateDoc(docRef, updatedImages);

      if (type === 'rabbi') {
        setRabbiImages(updatedImages.rabbi || []);
      } else if (type === 'agreements') {
        setEndorsementImages(updatedImages.agreements || []);
      } else {
        setImages(updatedImages);
      }
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
          !Array.isArray(images[key]) && images[key] ? (
            <div key={key} className="image-item">
              <div className="image-label">{key}</div>
              <img src={images[key]} alt={key} />
              <button onClick={() => handleDelete(images[key], key)}>Delete</button>
            </div>
          ) : null
        ))}
      </div>
      <div className="array-image-list">
        <h2>Rabbi Images</h2>
        <div className="scroll-container">
          {rabbiImages.map((url, index) => (
            <div key={index} className="image-item">
              <img src={url} alt={`Rabbi ${index + 1}`} />
              <button onClick={() => handleDelete(url, 'rabbi')}>Delete</button>
            </div>
          ))}
        </div>
        <h2>Agreements Images</h2>
        <div className="scroll-container">
          {endorsementImages.map((url, index) => (
            <div key={index} className="image-item">
              <img src={url} alt={`Endorsement ${index + 1}`} />
              <button onClick={() => handleDelete(url, 'agreements')}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <div className="upload-section">
        <select value={imageType} onChange={(e) => setImageType(e.target.value)}>
          <option value="">Select Image Type</option>
          <option value="mission">Mission</option>
          <option value="team">Team</option>
          <option value="involved">Involved</option>
          <option value="agreements">Agreements</option>
          <option value="agreements-background">Agreements Background</option>
          <option value="rabbi">Rabbi</option>
          <option value="rabbi-background">Rabbi Background</option>
        </select>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default AdminEditAboutUs;
