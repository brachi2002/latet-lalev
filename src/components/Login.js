import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // ודא שהייבוא נכון
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';
import GoogleButton from './GoogleButton';
import { useTranslation } from 'react-i18next';//a

const Login = () => {
  const { t } = useTranslation();//a
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);

      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        if (userDoc.data().isAdmin) {
          navigate('/admin'); // Redirect to admin dashboard if admin
        } else {
          navigate('/'); // Redirect to homepage
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('sssss');
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          isAdmin: false,
          isVolunteer: 'notVolunteering',
        });
      } else {
        if (userDoc.data().isAdmin) {
          navigate('/admin'); // Redirect to admin dashboard if admin
        } else {
          navigate('/'); // Redirect to homepage
        }
      }
    } catch (error) {
      setError(error.message + 'unable to login google');
    }
  };
  return (
    <div className="auth-container">
      <h2>{t('login')}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder={t('email_address2')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">{t('login')}</button>
      </form>
      <div className="or-login-with">{t('or_login_with')}</div>
      <GoogleButton handleGoogleLogin={handleGoogleLogin} />
    </div>
  );
};

export default Login;