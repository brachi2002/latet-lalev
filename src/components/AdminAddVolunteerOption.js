import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, getDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './AdminAddVolunteerOption.css';

const AdminAddVolunteerOption = () => {
    const [option, setOption] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const checkAdmin = async () => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists() && userDoc.data().isAdmin) {
                    setIsAdmin(true);
                    console.log("User is admin:", user.uid);
                } else {
                    setIsAdmin(false);
                    console.log("User is not admin:", user.uid);
                }
            } else {
                console.log("No user is logged in");
            }
        };

        const fetchOptions = async () => {
            const querySnapshot = await getDocs(collection(db, 'volunteerOptions'));
            const optionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOptions(optionsList);
        };

        checkAdmin();
        fetchOptions();
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
            const querySnapshot = await getDocs(collection(db, 'volunteerOptions'));
            const optionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOptions(optionsList);
        } catch (error) {
            console.error('Error adding option: ', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'volunteerOptions', id));
            alert('Option deleted successfully');
            setOptions(options.filter(option => option.id !== id));
        } catch (error) {
            console.error('Error deleting option: ', error);
        }
    };

    const handleGoToHomepage = () => {
        navigate('/'); // Navigate to home page
    };

    const handleGoToAdminDashboard = () => {
        navigate('/admin/dashboard'); // Navigate to admin dashboard page
    };

    return (
        <div className="admin-add-volunteer-option">
            <header className="admin-header">
                <h1>Add Volunteer Option</h1>
                {user && (
                    <>
                        <span className="user-email">{user.email}</span>
                        <button onClick={handleGoToHomepage} className="homepage-button">Go to Homepage</button>
                        <button onClick={handleGoToAdminDashboard} className="dashboard-button">Go to Admin Home</button>
                    </>
                )}
            </header>
            <div className="add-volunteer-option">
                {isAdmin ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={option}
                                name="option"
                                onChange={(e) => setOption(e.target.value)}
                                placeholder="Add Volunteer Option"
                                required
                            />
                            <button type="submit" className="add-option-button">Add Option</button>
                        </form>
                        <h2>Current Volunteer Options</h2>
                        <div className="current-volunteer-options">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Option</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {options.map(opt => (
                                        <tr key={opt.id}>
                                            <td>{opt.option}</td>
                                            <td>
                                                <button onClick={() => handleDelete(opt.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <p>You do not have permission to view this page</p>
                )}
            </div>
        </div>
    );
};

export default AdminAddVolunteerOption;
