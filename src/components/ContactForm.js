import React, { useState } from 'react';
import { db } from '../firebase'; // Ensure this import is correct
import { collection, addDoc } from 'firebase/firestore';
import './ContactForm.css';
import { useTranslation } from 'react-i18next';

function ContactForm() {
  const { t } = useTranslation(); 
  const [formData, setFormData] = useState({
    name: '',
    familyName: '',
    phone: '',
    email: '',
    address: '',
    reason: '',
    message: '',
    accept: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add a new document with a generated id.
      await addDoc(collection(db, 'contactUsRequests'), formData);
      alert('Your request has been submitted successfully.');
      // Reset the form after submission
      setFormData({
        name: '',
        familyName: '',
        phone: '',
        email: '',
        address: '',
        reason: '',
        message: '',
        accept: false,
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return (
    <div className="contact-form">
      <h2>{t('need_help')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder={t('first_name')}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="familyName"
            placeholder={t('last_name')}
            value={formData.familyName}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder={t('phone_number')}
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t('email_address')}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder={t('residential_address')}
            value={formData.address}
            onChange={handleChange}
          />
          <select name="reason" value={formData.reason} onChange={handleChange} required>
            <option value="">{t('reason_for_contacting')}</option>
            <option value="help">{t('help')}</option>
            <option value="advice">{t('advice')}</option>
            <option value="other">{t('other')}</option>
          </select>
          <textarea
            name="message"
            placeholder={t('how_can_we_help')}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <label>
            <input
              type="checkbox"
              name="accept"
              checked={formData.accept}
              onChange={handleChange}
            />
            {t('accept_policy')}
          </label>
        </div>
        <button type="submit" className="submit-button">{t('submit')}</button>
      </form>
    </div>
  );
}

export default ContactForm;
