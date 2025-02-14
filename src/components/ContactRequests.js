import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './viewContactRequests.css';

const ContactRequests = () => {
    const [requests, setRequests] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const Yes = 'Yes';
    const No = 'No';

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

    const handleMarkAsRead = async (id) => {
        try {
            const requestRef = doc(db, 'contactUsRequests', id);
            await updateDoc(requestRef, { read: true });
            setRequests(requests.map(req => req.id === id ? { ...req, read: true } : req));
        } catch (error) {
            console.error('Error marking request as read:', error);
        }
    };

    const handleDeleteRequest = async (id) => {
        try {
            const requestRef = doc(db, 'contactUsRequests', id);
            await deleteDoc(requestRef);
            setRequests(requests.filter(req => req.id !== id));
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    return (
        <div className="view-Requests">
            <header className="admin-header">
                <h1>Manage contact requests</h1>
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
                            <li key={request.id} className={request.read ? 'read' : 'new'}>
                                <div className="request-header">
                                    {request.read ? (
                                        <span className="label read-label">✔ read message</span>
                                    ) : (
                                        <span className="label new-label">new message</span>
                                    )}
                                </div>
                                <p><strong>Name:</strong> {request.name} {request.familyName}</p>
                                <p><strong>Phone Number:</strong> {request.phone}</p>
                                <p><strong>Email Address:</strong> {request.email}</p>
                                <p><strong>Residential Address:</strong> {request.address}</p>
                                <p><strong>Reason for contacting:</strong> {request.reason}</p>
                                <p><strong>Message:</strong> {request.message}</p>
                                <p><strong>I agree to receive newsletters and accept the privacy policy:</strong> {request.accept ? Yes : No}</p>
                                <div class = "buttons">
                                    {!request.read && (
                                    <button onClick={() => handleMarkAsRead(request.id)} className="mark-read-button">
                                        Mark as read
                                    </button>
                                )}
                                <button onClick={() => handleDeleteRequest(request.id)} className="delete-button">
                                    Delete
                                </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No contact requests</p>
                )}
            </div>
        </div>
    );
};

export default ContactRequests;
