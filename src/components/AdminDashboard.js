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
      navigate('/'); // Navigate to home page after sign out
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  const handleGoToHomepage = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        {user && (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleSignOut} className="logout-button">Logout</button>
            <button onClick={handleGoToHomepage} className="homepage-button">Go to Homepage</button>
          </>
        )}
      </header>
  
      <div className="cards-container">
        <div className="card">
          <Link to="/admin/add-volunteer-option">Add Volunteer Option</Link>
        </div>
        <div className="card">
          <Link to="/admin/manage-events">Manage Events</Link>
        </div>
        <div className="card">
          <Link to="/admin/volunteers">View Volunteers</Link>
        </div>
        <div className="card">
          <Link to="/admin/view-user">View User</Link>
       </div>
       <div className="card">
          <Link to="/admin/view-requests">View contacts requests</Link>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
