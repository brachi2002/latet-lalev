import React, { useState } from 'react';
import './Endorsement.css';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from './Navbar';
import endorsement1 from './images/recommendation/RAB-BURSTEIN.jpg';
import endorsement2 from './images/recommendation/RAB-ELBAZ.jpg';
import endorsement3 from './images/recommendation/recommendation1.jpg';
import endorsement4 from './images/recommendation/recommendation2.jpg';
import Modal from 'react-modal';

const Endorsement = ({ isAdmin }) => {
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
      <div className="endorsement-page">
        <div className="endorsement-header">
          <h1>{t('agreements')}</h1>
        </div>
        <div className="endorsement-content">
          <div className="endorsement-item" onClick={() => openModal(endorsement1)}>
            <img src={endorsement1} alt="Endorsement 1" />
          </div>
          <div className="endorsement-item" onClick={() => openModal(endorsement2)}>
            <img src={endorsement2} alt="Endorsement 2" />
          </div>
          <div className="endorsement-item" onClick={() => openModal(endorsement3)}>
            <img src={endorsement3} alt="Endorsement 3" />
          </div>
          <div className="endorsement-item" onClick={() => openModal(endorsement4)}>
            <img src={endorsement4} alt="Endorsement 4" />
          </div>
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
