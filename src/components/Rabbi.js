import React, { useState, useEffect } from 'react';
import './Rabbi.css';
import { useTranslation } from 'react-i18next';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from './Navbar';
import videoThumbnail from './images/rabbi/IMG_0006 (5).JPG';
import Modal from 'react-modal';
import { doc, getDoc } from 'firebase/firestore';

const Rabbi = ({ isAdmin }) => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rabbiImages, setRabbiImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const docRef = doc(db, 'aboutUs', 'images');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRabbiImages(docSnap.data().rabbi || []);
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
      <div className="rabbi-page">
        <div className="rabbi-header">
          <h1>{t('rabbi_of_the_association')}</h1>
        </div>
        <div className="rabbi-content">
          <h2>{t('pictures_of_rabbi')}</h2>
          <div className="rabbi-images">
            {rabbiImages.map((imageURL, index) => (
              <div key={index} className="rabbi-image-item" onClick={() => openModal(imageURL)}>
                <img src={imageURL} alt={`Rabbi ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
        <div className="video-section">
          <h2>{t('rabbi_lessons')}</h2>
          {/* <ul> */}
          <a href="https://drive.google.com/file/d/1_J136jUQOYtiqyvsAAQLzpzH_lMjWMV4/view?usp=drive_link" target="_blank"
        rel="noopener noreferrer">
        <div className="video-thumbnail-container">
          <img src={videoThumbnail} alt="Video Thumbnail" className="video-thumbnail" />
          <div className="play-button-overlay"></div>
        </div>
      </a>
      <a href="https://drive.google.com/file/d/1_TfDfqrS8SRs8rLpqKxGKwezcnqU1HLA/view?usp=drive_link" target="_blank"
        rel="noopener noreferrer">
        <div className="video-thumbnail-container">
          <img src={videoThumbnail} alt="Video Thumbnail" className="video-thumbnail" />
          <div className="play-button-overlay"></div>
        </div>
      </a>
      <a href="https://drive.google.com/file/d/1jZjksT2RkNNWAjj9wC9h21sDre3Zh7q7/view?usp=drive_link" target="_blank"
        rel="noopener noreferrer">
        <div className="video-thumbnail-container">
          <img src={videoThumbnail} alt="Video Thumbnail" className="video-thumbnail" />
          <div className="play-button-overlay"></div>
           </div>
          </a>
          {/* </ul> */}
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

export default Rabbi;
