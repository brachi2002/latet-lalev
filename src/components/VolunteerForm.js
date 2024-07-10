import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';
import MultiSelectComponent from './MultiSelectComponent';
import './VolunteerForm.css';

const VolunteerForm = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(user ? user.email : '');
  const [city, setCity] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [phone, setPhone] = useState('');
  const [hasCar, setHasCar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'volunteers'), {
        name,
        email,
        city,
        volunteerOptions: selectedOptions.map(option => option.value),
        phone,
        hasCar,
      });
      alert('Thank you for volunteering!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Want to join us?</h2>
      <h3>Fill out the form and join our volunteer network!</h3>
      
      <label className="required">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First Name"
          required
        />
      </label>
      <label className="required">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
              required
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="regular"
              value="no"
              required
            />
            No
          </label>
        </div>

        <div className="checkbox-group">
          <label>Volunteer Field - Select at least one</label>
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
        <textarea placeholder="Comments"></textarea>
      </label>
      <label>
        <input
          type="checkbox"
          required
        />
        I agree to receive communications and accept the privacy policy.
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default VolunteerForm;
