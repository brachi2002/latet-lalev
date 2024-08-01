// LanguageSupport.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './LanguageSupport.css';

const LanguageSupport = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };

    const fetchLanguages = async () => {
      const querySnapshot = await getDocs(collection(db, 'lang'));
      const languagesList = querySnapshot.docs.map(doc => ({ id: doc.id, language: doc.id, ...doc.data() }));
      setLanguages(languagesList);
    };

    checkAdmin();
    fetchLanguages();
  }, [user]);

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    setSelectedValues(language);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, 'lang', selectedLanguage.id);
      await updateDoc(docRef, selectedValues);
      alert('Language updated successfully');
      setSelectedLanguage(null);
    } catch (error) {
      console.error('Error updating language: ', error);
      alert('Failed to update language');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredValues = Object.keys(selectedValues).filter(key => 
    key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    selectedValues[key].toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return <p>You do not have permission to view this page</p>;
  }

  return (
    <div className="language-support">
      <header className="admin-header">
        <h1>Language Support</h1>
        {user && (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={() => navigate('/')} className="button">Go to Homepage</button>
            <button onClick={() => navigate('/admin/dashboard')} className="button">Go to Admin Home</button>
          </>
        )}
      </header>
      <div className="languages-list">
        {languages.map(lang => (
          <button key={lang.id} onClick={() => handleSelectLanguage(lang)} className="language-button">
            {lang.language.toUpperCase()}
          </button>
        ))}
      </div>
      {selectedLanguage && (
        <>
          <div className="search-container">
            <input 
              type="text"
              placeholder="Search word..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <form onSubmit={handleSubmit} className="language-form">
            <h2>Edit {selectedLanguage.language.toUpperCase()}</h2>
            {filteredValues.map((key) => (
              key !== 'id' && key !== 'language' && (
                <label key={key}>
                  {key}:
                  <input
                    type="text"
                    name={key}
                    value={selectedValues[key]}
                    onChange={handleChange}
                    className="input-field"
                  />
                </label>
              )
            ))}
            <div className="form-buttons">
              <button type="submit" className="button">Update</button>
              <button type="button" onClick={() => setSelectedLanguage(null)} className="button">Cancel</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default LanguageSupport;
