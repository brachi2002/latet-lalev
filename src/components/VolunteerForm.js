// src/components/VolunteerForm.js

import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const VolunteerForm = () => {
    const [user] = useAuthState(auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState(user ? user.email : '');
    const [volunteerOption, setVolunteerOption] = useState('');
    const [volunteerOptions, setVolunteerOptions] = useState([]);

    useEffect(() => {
        const fetchVolunteerOptions = async () => {
            const volunteerOptionsSnapshot = await getDocs(collection(db, 'volunteerOptions'));
            const volunteerOptionsList = volunteerOptionsSnapshot.docs.map(doc => doc.data().option);
            setVolunteerOptions(volunteerOptionsList);
        };

        fetchVolunteerOptions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'volunteers'), {
                name,
                email,
                volunteerOption,
            });
            alert('Thank you for volunteering!');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled={!!user}
            />
            {user && (
                <select
                    value={volunteerOption}
                    onChange={(e) => setVolunteerOption(e.target.value)}
                    required
                >
                    <option value="">Select a volunteer option</option>
                    {volunteerOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            )}
            {user && <button type="submit">Submit</button>}
        </form>
    );
};

export default VolunteerForm;
