import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (adminDoc.exists()) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        navigate('/signup'); // מפנה לעמוד ההרשמה אם המשתמש לא קיים
      } else {
        setError(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (adminDoc.exists()) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>התחברות</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="auth-form">
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
        <button type="submit" className="auth-button">התחבר</button>
      </form>
      <button onClick={handleGoogleLogin} className="google-button">
        <i className="fab fa-google"></i>
      </button>
    </div>
  );
};

export default Login;
