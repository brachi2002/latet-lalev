import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './AdminDashboard.css';
import { Helmet } from 'react-helmet';


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
      <Helmet>
        <title>Admin | Latet lalev</title>
      </Helmet>
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
        <Link to="/admin/add-volunteer-option" className="card">
          Add Volunteer Option
        </Link>
        <Link to="/admin/manage-events" className="card">
          Manage Events
        </Link>
        <Link to="/admin/edit-about-us" className="card">
          Edit About Us
        </Link>
        <Link to="/admin/view-user" className="card">
          View User
        </Link>
        <Link to="/admin/view-requests" className="card">
        View contacts requests
        </Link>
        <Link to="/admin/language-support" className="card">
        language support
        </Link>
        <Link to="/admin/messages" className="card">
        messeges
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
