import React, { useState } from 'react';
import './Rabbi.css';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from './Navbar';
import videoThumbnail from './images/rabbi/IMG_0006 (5).JPG';
import rabbiImage1 from './images/rabbi/1.jpg';
import rabbiImage2 from './images/rabbi/2.jpg';
import rabbiImage3 from './images/rabbi/IMG_0001 (2).JPG';
import rabbiImage4 from './images/rabbi/IMG_0006 (2) (2).JPG';
import Modal from 'react-modal';

const Rabbi = ({ isAdmin }) => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
        <div className="video-section">
          <a href="https://drive.google.com/file/d/1jZjksT2RkNNWAjj9wC9h21sDre3Zh7q7/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
            <img src={videoThumbnail} alt="Video Thumbnail" className="video-thumbnail" />
          </a>
        </div>
        <div className="rabbi-content">
          <h2>{t('pictures_of_rabbi')}</h2>
          <div className="rabbi-images">
            <div className="rabbi-image-item" onClick={() => openModal(rabbiImage1)}>
              <img src={rabbiImage1} alt="Rabbi 1" />
            </div>
            <div className="rabbi-image-item" onClick={() => openModal(rabbiImage2)}>
              <img src={rabbiImage2} alt="Rabbi 2" />
            </div>
            <div className="rabbi-image-item" onClick={() => openModal(rabbiImage3)}>
              <img src={rabbiImage3} alt="Rabbi 3" />
            </div>
            <div className="rabbi-image-item" onClick={() => openModal(rabbiImage4)}>
              <img src={rabbiImage4} alt="Rabbi 4" />
            </div>
          </div>
        </div>
        <div className="rabbi-lessons">
          <h2>{t('rabbi_lessons')}</h2>
          <ul>
            <li><a href="https://drive.google.com/file/d/1_J136jUQOYtiqyvsAAQLzpzH_lMjWMV4/view?usp=drive_link" target="_blank" rel="noopener noreferrer">{t('lesson')} 1</a></li>
            <li><a href="https://drive.google.com/file/d/1_TfDfqrS8SRs8rLpqKxGKwezcnqU1HLA/view?usp=drive_link" target="_blank" rel="noopener noreferrer">{t('lesson')} 2</a></li>
          </ul>
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
