// src/components/AdminAddVolunteerOption.js

import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const AdminAddVolunteerOption = () => {
    const [option, setOption] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const checkAdmin = async () => {
            if (user) {
                const q = query(collection(db, 'admins'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    setIsAdmin(true);
                }
            }
        };
        checkAdmin();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAdmin) {
            alert("You don't have permission to perform this action");
            return;
        }

        try {
            await addDoc(collection(db, 'volunteerOptions'), {
                option: option
            });
            alert('Option added successfully');
            setOption('');
        } catch (error) {
            console.error('Error adding option: ', error);
        }
    };

    return (
        <div>
            {isAdmin ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={option}
                        name="option"
                        onChange={(e) => setOption(e.target.value)}
                        placeholder="Add Volunteer Option"
                        required
                    />
                    <button type="submit">Add Option</button>
                </form>
            ) : (
                <p>You do not have permission to view this page</p>
            )}
        </div>
    );
};

export default AdminAddVolunteerOption;
