import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './VolunteerForm.css';
import MultiSelectComponent from './MultiSelectComponent';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';

const VolunteerForm = () => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); 
  const [email, setEmail] = useState(user ? user.email : '');
  const [city, setCity] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [phone, setPhone] = useState('');
  const [hasCar, setHasCar] = useState(false);
  const [comments, setComments] = useState('');
  const [volunteerRegularly, setVolunteerRegularly] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedOptions.length === 0) {
      setError('You must select at least one field of volunteering.');
      return;
    }

    try {
      // Add volunteer details to the 'volunteers' collection
      await addDoc(collection(db, 'volunteers'), {
        firstName,
        lastName,
        email,
        city,
        age,
        gender,
        volunteerOptions: selectedOptions.map(option => option.label),
        phone,
        hasCar,
        comments,
        volunteerRegularly,
        createdAt: new Date(),
      });

      // Update user's isVolunteer status to 'signed'
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        isVolunteer: 'signed',
      });

      alert(t('thank_you_for_volunteering'));
      navigate('/'); // Redirect to homepage after saving the data
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
      <h2>{t('want_to_join_us')}</h2>
      <h3>{t('fill_out_the_form')}</h3>
        
        <label className="required">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={t('first_name2')}
            required
          />
        </label>
        <label className="required">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={t('last_name2')}
            required
          />
        </label>
        <label className="required">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t('phone')}
            required
          />
        </label>
        <label className="required">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={t('city')}
            required
          />
        </label>
        <label className="required">
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder={t('age')}
            required
          />
        </label>
        <label className="required">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">{t('select_gender')}</option>
            <option value="male">{t('male')}</option>
            <option value="female">{t('female')}</option>
          </select>
        </label>
        <label className="required">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('email')}
            required
            disabled={!!user}
          />
        </label>

        <div className="group-container">
          <div className="radio-group">
          <label>{t('volunteer_regularly')}</label>
            <label>
              <input
                type="radio"
                name="regular"
                value="yes"
                onChange={(e) => setVolunteerRegularly('yes')}
                required
              />
             {t('yes')}
            </label>
            <label>
              <input
                type="radio"
                name="regular"
                value="no"
                onChange={(e) => setVolunteerRegularly('no')}
                required
              />
              {t('no')}
            </label>
          </div>

          <div className="multi-select-group">
          <label>{t('field_of_volunteering')}</label>
            <MultiSelectComponent
              selected={selectedOptions}
              setSelected={setSelectedOptions}
            />
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={hasCar}
              onChange={(e) => setHasCar(e.target.checked)}
            />
              {t('have_car')}
          </label>
        </div>
        <label>
        {t('comments')}
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder={t('comments')}
          ></textarea>
        </label>
        <label>
          <input
            type="checkbox"
            required
          />
          {t('agree_to_receive_newsletters')}
        </label>
        <button type="submit">{t('submit')}</button>
      </form>
    </div>
  );
};

export default VolunteerForm;
