// VolunteerList.js
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

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
