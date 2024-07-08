import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>ברוכים הבאים לעמותת עולים חדשים</h1>
        <p>תמיכה וסיוע לעולים חדשים בארץ</p>
        <Link to="/services" className="main-button">גלה עוד</Link>
      </header>
    </div>
  );
};

export default Home;
