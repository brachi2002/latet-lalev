import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ user, handleSignOut, handleDonateClick, handleHomeClick, handleVolunteerClick, handleContactClick, isAdmin }) => (
  <div className="navbar">
    <div className="buttons-container">
      {user ? (
        <>
          <button onClick={handleSignOut} className="logout-button">Logout</button>
          <span className="user-email">{user.email}</span>
        </>
      ) : (
        <>
          <button className="login-button"><Link to="/login" className='navbar-link'>Login</Link></button>
          <button className="signup-button"><Link to="/signup" className='navbar-link'>Sign Up</Link></button>
        </>
      )}
      <button className="donate-button" onClick={handleDonateClick}>Donate</button>
    </div>
    <nav>
      <ul>
        {user && isAdmin && (
          <>
            <li><Link to="/admin">Manage</Link></li>
          </>
        )}
        <li><button onClick={handleContactClick} className="link-button">Contact Us</button></li>
        <li><button onClick={handleVolunteerClick} className="link-button">Volunteer</button></li>
        <li><Link to="/events" className="link-button">Events</Link></li>
        <li><Link to="/services" className="link-button">Services</Link></li>
        <li><Link to="/about-us" className="link-button">Our Story</Link></li>
        <li><button onClick={handleHomeClick} className="link-button">Home</button></li>
      </ul>
    </nav>
  </div>
);

export default Navbar;
