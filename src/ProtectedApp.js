// ProtectedApp.js
import React, { useState, useEffect, Suspense } from 'react';
import App from './App';
import { auth } from './firebase';
import initTranslations from './i18n';

// Simulate an authentication check
const checkAuth = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const isAuthenticated = auth.authStateReady(); // Check authenticated state
      if (isAuthenticated) {
        resolve(true);
      } else {
        reject(new Error('User not authenticated'));
      }
    }, 1000);
  });

const ProtectedApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  useEffect(() => {
    const initAuthAndTranslations = async () => {
      try {
        await checkAuth();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }

      await initTranslations();
      setTranslationsLoaded(true);
    };

    initAuthAndTranslations();
  }, []);

  if (isAuthenticated === null || !translationsLoaded) {
    return<div className="loading-container">
      <div className="loading-arrow"></div>
  </div>;
  }

  if (!isAuthenticated) {
    return <div>User is not authenticated</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  );
};

export default ProtectedApp;
