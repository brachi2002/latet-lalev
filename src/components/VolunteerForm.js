import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './VolunteerForm.css';
import MultiSelectComponent from './MultiSelectComponent';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';

const VolunteerForm = ({ isAdmin }) => {
  const { t } = useTranslation();
  const [authUser, loading] = useAuthState(auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [phone, setPhone] = useState('');
  const [hasCar, setHasCar] = useState(false);
  const [comments, setComments] = useState('');
  const [volunteerRegularly, setVolunteerRegularly] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      setEmail(authUser.email);
    }
  }, [authUser]);

  useEffect(() => {
    if (!loading && !authUser) {
      console.log('User is not authenticated. Redirecting to /login');
      navigate('/login', { state: { from: '/volunteer' } }); // Pass the intended destination in state
    }
  }, [authUser, loading, navigate]);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{7,10}$/; // Example for 7 or 10 digit phone number
    return phoneRegex.test(phone);
  };

  const validateCityName = (city) => {
    const cityRegex = /^[a-zA-Z\u0590-\u05FF\s]+$/; // Allows only letters and Hebrew characters
    return cityRegex.test(city);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Selected options:', selectedOptions);

    if (selectedOptions.length === 0) {
      setFormError(t('error_select_volunteering'));
      return;
    }
    
    if (!validatePhoneNumber(phone)) {
      setFormError(t('error_invalid_phone'));
      return;
    }
    
    if (!validateCityName(city)) {
      setFormError(t('error_invalid_city'));
      return;
    }

    try {
      const volunteerDocRef = doc(db, 'volunteers', authUser.uid);
      const volunteerDoc = await getDoc(volunteerDocRef);

      if (volunteerDoc.exists()) {
        if (!window.confirm(t('confirm_change_volunteer_form'))) {
          return;
        }
      }

      console.log('Adding volunteer details to the database');

      // Add or update volunteer details in the 'volunteers' collection with the user's UID as the document ID
      await setDoc(volunteerDocRef, {
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
      const userDocRef = doc(db, 'users', authUser.uid);
      await updateDoc(userDocRef, {
        isVolunteer: 'signed',
      });

      alert(t('thank_you_for_volunteering'));
      navigate('/'); // Redirect to homepage after saving the data
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Volunteer | Latet lalev</title>
      </Helmet>
      <Navbar user={authUser} isAdmin={isAdmin} />
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
            disabled={!!authUser}
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
        {formError && <p className="error-message">{formError}</p>}
        <button type="submit">{t('submit')}</button>
      </form>
    </div>
  );
};

export default VolunteerForm;
