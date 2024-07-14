import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const AdminAddVolunteerOption = () => {
    const [option, setOption] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = async () => {
            if (user) {
                const q = query(collection(db, 'admins'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    setIsAdmin(true);
                    console.log("User is admin:", user.uid);
                } else {
                    console.log("User is not in admin list:", user.uid);
                }
            } else {
                console.log("No user is logged in");
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

    const handleGoToHomepage = () => {
        navigate('/'); // Navigate to home page
    };

    return (
    
      <div className="admin-add-volunteer-option">
      <header className="admin-header">
        <h1>Add Volunteer Option</h1>
        {user && (
          <>
            <span className="user-email">{user.email}</span>
          
            <button onClick={handleGoToHomepage} className="homepage-button">Go to Homepage</button>
          </>
        )}
      </header>
      <div className="add-volunteer-option">
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
        
          
        </div>
    );
};

export default AdminAddVolunteerOption;
