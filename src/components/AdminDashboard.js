import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      console.log('User signed out');
      navigate('/'); // ניווט לדף הבית לאחר ההתנתקות
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        {user && (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleSignOut} className="logout-button">Logout</button>
          </>
        )}
      </header>
      <nav>
        <ul>
          <li><Link to="/admin/add-volunteer-option">Add Volunteer Option</Link></li>
          <li><Link to="/admin/manage-events">Manage Events</Link></li>
          <li><Link to="/admin/volunteers">View Volunteers</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
