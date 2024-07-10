import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Your Logo</Link>
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/volunteer">Volunteer</Link></li>
        {user ? (
          <>
            <li>{user.email}</li>
            <li><button onClick={handleSignOut}>Sign Out</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
