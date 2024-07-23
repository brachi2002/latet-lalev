import React, { useState, useEffect } from 'react';
import './Endorsement.css';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from './Navbar';
import Modal from 'react-modal';
import { doc, getDoc } from 'firebase/firestore';

const Endorsement = ({ isAdmin }) => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [endorsementImages, setEndorsementImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const docRef = doc(db, 'aboutUs', 'images');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEndorsementImages(docSnap.data().agreements || []);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchImages();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Navbar user={user} isAdmin={isAdmin} />
      <div className="endorsement-page">
        <div className="endorsement-header">
          <h1>{t('agreements')}</h1>
        </div>
        <div className="endorsement-content">
          {endorsementImages.map((imageURL, index) => (
            <div key={index} className="endorsement-item" onClick={() => openModal(imageURL)}>
              <img src={imageURL} alt={`Endorsement ${index + 1}`} />
            </div>
          ))}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Selected Image"
          className="modal"
          overlayClassName="overlay"
        >
          <button onClick={closeModal} className="close-button">&times;</button>
          <img src={selectedImage} alt="Selected" className="modal-image" />
        </Modal>
      </div>
    </div>
  );
};

export default Endorsement;
