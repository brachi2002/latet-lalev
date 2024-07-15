import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './VolunteerForm.css';
import MultiSelectComponent from './MultiSelectComponent';

const VolunteerForm = () => {
  const [user] = useAuthState(auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(user ? user.email : '');
  const [city, setCity] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [phone, setPhone] = useState('');
  const [hasCar, setHasCar] = useState(false);
  const [comments, setComments] = useState('');
  const [volunteerRegularly, setVolunteerRegularly] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'volunteers'), {
        firstName,
        lastName,
        email,
        city,
        volunteerOptions: selectedOptions.map(option => option.label),
        phone,
        hasCar,
        comments,
        volunteerRegularly,
        createdAt: new Date(),
      });
      alert('Thank you for volunteering!');
      navigate('/'); // חזרה לדף הבית לאחר שמירת הנתונים
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  const { t } = useTranslation();//a
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h2>Want to join us?</h2>
        <h3>Fill out the form and join our volunteer team!</h3>
        
        <label className="required">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </label>
        <label className="required">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </label>
        <label className="required">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
          />
        </label>
        <label className="required">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />
        </label>
        <label className="required">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            disabled={!!user}
          />
        </label>

        <div className="group-container">
          <div className="radio-group">
            <label>Would you like to volunteer regularly?</label>
            <label>
              <input
                type="radio"
                name="regular"
                value="yes"
                onChange={(e) => setVolunteerRegularly('yes')}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="regular"
                value="no"
                onChange={(e) => setVolunteerRegularly('no')}
                required
              />
              No
            </label>
          </div>

          <div className="multi-select-group">
            <label>Field of Volunteering - Select at least one</label>
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
            Do you have a car?
          </label>
        </div>
        <label>
          Comments
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Comments"
          ></textarea>
        </label>
        <label>
          <input
            type="checkbox"
            required
          />
          I agree to receive newsletters and accept the privacy policy.
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VolunteerForm;
