import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './VolunteerList.css';
import { useTranslation } from 'react-i18next';

const VolunteerList = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchVolunteers = async () => {
            const querySnapshot = await getDocs(collection(db, 'volunteers'));
            setVolunteers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchVolunteers();
    }, []);

    const handleGoToHomepage = () => {
        navigate('/'); // Navigate to home page
    };

    const handleGoToAdminDashboard = () => {
        navigate('/admin/dashboard'); // Navigate to admin dashboard page
    };

    return (
        <div className="volunteer-list">
            <header className="admin-header">
                <h1>Volunteer List</h1>
                {user && (
                    <>
                        <span className="user-email">{user.email}</span>
                        <button onClick={handleGoToHomepage} className="homepage-button">Go to Homepage</button>
                        <button onClick={handleGoToAdminDashboard} className="dashboard-button">Go to Admin Home</button>
                    </>
                )}
            </header>
            <div>
                <h2>Volunteers:</h2>
                <ul>
                    {volunteers.map((volunteer) => (
                        <li key={volunteer.id}>
                            <strong>Name:</strong> {volunteer.firstName} {volunteer.lastName}<br />
                            <strong>Email:</strong> {volunteer.email}<br />
                            <strong>City:</strong> {volunteer.city}<br />
                            <strong>Phone:</strong> {volunteer.phone}<br />
                            <strong>Has Car:</strong> {volunteer.hasCar ? 'Yes' : 'No'}<br />
                            <strong>Comments:</strong> {volunteer.comments}<br />
                            <strong>Volunteer Regularly:</strong> {volunteer.volunteerRegularly}<br />
                            <strong>Volunteer Options:</strong> {volunteer.volunteerOptions.join(', ')}<br />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VolunteerList;
