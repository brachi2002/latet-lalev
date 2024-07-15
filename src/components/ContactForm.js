import React, { useState } from 'react';
import './ContactForm.css';
import { useTranslation } from 'react-i18next';//a

function ContactForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the code to handle the form submission
    console.log(formData);
  };
  const { t } = useTranslation();//a
  return (
    <div className="contact-form">
      <h2>Need help? Want to consult? We're here for you</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="What is your first name?"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="familyName"
            placeholder="What is your last name?"
            value={formData.familyName}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="What is your phone number?"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="What is your email address?"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="What is your residential address?"
            value={formData.address}
            onChange={handleChange}
          />
          <select name="reason" value={formData.reason} onChange={handleChange} required>
            <option value="">Reason for contacting</option>
            <option value="help">Help</option>
            <option value="advice">Advice</option>
            <option value="other">Other</option>
          </select>
          <textarea
            name="message"
            placeholder="How can we help you?"
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
            I agree to receive newsletters and accept the privacy policy
          </label>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
