import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const VolunteerList = () => {
    const [user] = useAuthState(auth);
    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
        const fetchVolunteers = async () => {
            const volunteersSnapshot = await getDocs(collection(db, 'volunteers'));
            const volunteersList = volunteersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setVolunteers(volunteersList);
        };

        fetchVolunteers();
    }, []);

    return (
        <div>
            <h2>רשימת מתנדבים</h2>
            <ul>
                {volunteers.map(volunteer => (
                    <li key={volunteer.id}>
                        <p>שם: {volunteer.name}</p>
                        <p>דוא"ל: {volunteer.email}</p>
                        <p>אפשרות התנדבות: {volunteer.volunteerOption}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VolunteerList;
