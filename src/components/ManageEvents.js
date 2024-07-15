import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './ManageEvents.css'; // ודא שקיים קובץ CSS מתאים

const ManageEvents = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleGoToHomepage = () => {
        navigate('/'); // Navigate to home page
    };

    const handleGoToAdminDashboard = () => {
        navigate('/admin/dashboard'); // Navigate to admin dashboard page
    };

    return (
        <div className="admin-manage-events">
            <header className="admin-header">
                <h1>Manage Events</h1>
                {user && (
                    <>
                        <span className="user-email">{user.email}</span>
                        <button onClick={handleGoToHomepage} className="homepage-button">Go to Homepage</button>
                        <button onClick={handleGoToAdminDashboard} className="dashboard-button">Go to Admin Home</button>
                    </>
                )}
            </header>
            <div>
                <p>Here you can manage and edit events.</p>
            </div>
        </div>
    );
};

export default ManageEvents;
