import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './viewContactRequests.css';
import { useTranslation } from 'react-i18next';

const ContactRequests = () => {
    const [requests, setRequests] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchRequests = async () => {
            const querySnapshot = await getDocs(collection(db, 'contactUsRequests'));
            const requestsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRequests(requestsList);
        };

        fetchRequests();
    }, []);

    const handleGoToHomepage = () => {
        navigate('/'); // Navigate to home page
    };

    const handleGoToAdminDashboard = () => {
        navigate('/admin/dashboard'); // Navigate to admin dashboard page
    };

    return (
        <div className="view-Requests">
            <header className="admin-header">
                <h1>{t('contact_requests')}</h1>
                {user && (
                    <>
                        <span className="user-email">{user.email}</span>
                        <button onClick={handleGoToHomepage} className="homepage-button">Go to Homepage</button>
                        <button onClick={handleGoToAdminDashboard} className="dashboard-button">Go to Admin Home</button>
                    </>
                )}
            </header>
            <div className="requests-list">
                {requests.length > 0 ? (
                    <ul>
                        {requests.map((request) => (
                            <li key={request.id}>
                                <p><strong>{t('name')}:</strong> {request.name} {request.familyName}</p>
                                <p><strong>{t('phone_number')}:</strong> {request.phone}</p>
                                <p><strong>{t('email_address')}:</strong> {request.email}</p>
                                <p><strong>{t('residential_address')}:</strong> {request.address}</p>
                                <p><strong>{t('reason_for_contacting')}:</strong> {request.reason}</p>
                                <p><strong>{t('message')}:</strong> {request.message}</p>
                                <p><strong>{t('accept_policy')}:</strong> {request.accept ? t('yes') : t('no')}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{t('no_contact_requests')}</p>
                )}
            </div>
        </div>
    );
};

export default ContactRequests;
