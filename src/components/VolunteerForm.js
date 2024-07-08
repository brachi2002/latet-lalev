import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';

const VolunteerForm = () => {
    const [user] = useAuthState(auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState(user ? user.email : '');
    const [volunteerOption, setVolunteerOption] = useState('');

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
            <select
                value={volunteerOption}
                onChange={(e) => setVolunteerOption(e.target.value)}
                required
            >
                <option value="">Select a volunteer option</option>
                <option value="Food Packages">Food Packages</option>
                <option value="Hospital Transportation">Hospital Transportation</option>
                <option value="Helping with Children">Helping with Children</option>
                <option value="Volunteering in Classes">Volunteering in Classes</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
};

export default VolunteerForm;
