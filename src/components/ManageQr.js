import React, { useState, useEffect } from 'react';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './ManageQr.css';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const ManageQr = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [donationMethods, setDonationMethods] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    const fetchDonationsData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Donations'));
      setDonationMethods(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchDonationsData();
  }, []);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpdate = async () => {
    if (!selectedMethod || (!selectedFile && !newUrl)) {
      alert('Please select a method and provide either a new URL or a new QR code image.');
      return;
    }

    const methodRef = doc(db, 'Donations', selectedMethod.id);
    const storage = getStorage();
    let qrPicUrl = selectedMethod.pic;

    if (selectedFile) {
      const storageRef = ref(storage, `qr-pic/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      qrPicUrl = await getDownloadURL(storageRef);
    }

    await setDoc(methodRef, { ...selectedMethod, url: newUrl || selectedMethod.url, pic: qrPicUrl });
    alert('Donation method updated successfully');
    navigate('/donations');
  };

  return (
    <div>
      <Helmet>
        <title>Manage QR Codes | Latet lalev</title>
      </Helmet>
      <header className="admin-header">
        <h1>Manage QR Codes and URLs</h1>
        {user && (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={() => navigate('/')} className="homepage-button">Go to Homepage</button>
            <button onClick={() => navigate('/admin/dashboard')} className="dashboard-button">Go to Admin Home</button>
          </>
        )}
      </header>
      <div className="manage-qr-container">
        <h2>Select Donation Method</h2>
        <div className="form-group">
          <select onChange={(e) => setSelectedMethod(donationMethods.find(m => m.id === e.target.value))}>
            <option value="">Select a method</option>
            {donationMethods.map(method => (
              <option key={method.id} value={method.id}>{method.name}</option>
            ))}
          </select>
        </div>
        {selectedMethod && (
          <>
            <div className="form-group">
              <label htmlFor="file-upload" className="custom-file-upload">
                <FontAwesomeIcon icon={faUpload} /> Choose File
              </label>
              <input id="file-upload" type="file" accept="image/*" onChange={handleFileUpload} />
              {selectedFile && <span>{selectedFile.name}</span>}
            </div>
            <div className="form-group">
              <label>New URL</label>
              <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="Enter new URL" />
            </div>
            <button className="update-button" onClick={handleUpdate}>Update</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageQr;
