import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Singup.css';
import GoogleButton from './GoogleButton';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        isAdmin: false,
        isVolunteer: 'notVolunteering', // or 'signed' based on your logic
      });
      navigate('/'); // Redirect to homepage or admin dashboard based on your logic
    } catch (error) {
      setError(error.message);
      console.error("Error during signup:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        isAdmin: false,
        isVolunteer: 'notVolunteering',
      });
      navigate('/'); // Redirect to homepage or admin dashboard based on your logic
    } catch (error) {
      setError(error.message);
      console.error("Error during Google signup:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>הרשמה</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="email"
          placeholder="כתובת דוא״ל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">הירשם</button>
      </form>
      <div className="or-login-with">sign up with:</div>
      <GoogleButton handleGoogleLogin={handleGoogleLogin} />
    </div>
  );
};

export default Signup;
