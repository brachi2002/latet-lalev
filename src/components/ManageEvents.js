import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './ManageEvents.css';

const ManageEvents = () => {
    const [event, setEvent] = useState({ name: '', description: '', imageUrls: [] });
    const [files, setFiles] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user] = useAuthState(auth);
    const [events, setEvents] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editEventId, setEditEventId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

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
        const fetchEvents = async () => {
            const querySnapshot = await getDocs(collection(db, 'EventList'));
            const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventsList.reverse()); // reverse the list to show the latest events at the top
        };
        checkAdmin();
        fetchEvents();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAdmin) {
            alert("You don't have permission to perform this action");
            return;
        }

        try {
            const imageUrls = await Promise.all(files.map(async (file) => {
                const storageRef = ref(storage, `images/${file.name}`); // Correct the file name reference
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            }));

            const eventData = {
                name: event.name,
                description: event.description,
                imageUrls: imageUrls, // Add the array of image URLs
            };

            if (editMode) {
                const eventDoc = doc(db, 'EventList', editEventId);
                await updateDoc(eventDoc, eventData);
                alert('Event updated successfully');
            } else {
                await addDoc(collection(db, 'EventList'), eventData);
                alert('Event added successfully');
            }

            setEvent({ name: '', description: '', imageUrls: [] });
            setFiles([]);
            setEditMode(false);
            setEditEventId(null);
            setShowModal(false); // Close the modal after submission

            const querySnapshot = await getDocs(collection(db, 'EventList'));
            const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEvents(eventsList.reverse());

        } catch (error) {
            console.error('Error adding/updating event: ', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleEdit = (event) => {
        setEditMode(true);
        setEditEventId(event.id);
        setEvent(event);
        setShowModal(true); // Show the modal when edit button is clicked
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'EventList', id));
            alert('Event deleted successfully');
            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            console.error('Error deleting event: ', error);
        }
    };

    const handleGoToHomepage = () => {
        navigate('/');
    };

    const handleGoToAdminDashboard = () => {
        navigate('/admin/dashboard');
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="manage-events">
            {isAdmin ? (
                <div>
                    <header className="admin-header">
                        <h1>Manage Events</h1>
                        {user && (
                            <>
                                <span className="user-email">{user.email}</span>
                                <button onClick={handleGoToHomepage} className="homepage-button">Go to Homepage</button>
                                <button onClick={handleGoToAdminDashboard} className="dashboard-button">Go to Admin Home</button>
                            </>
                        )}
                    </header>
                    <form onSubmit={handleSubmit} className="add-event-form">
                        <input
                            type="text"
                            name="name"
                            value={event.name}
                            onChange={handleInputChange}
                            placeholder="Event Name"
                            required
                        />
                        <textarea
                            name="description"
                            value={event.description}
                            onChange={handleInputChange}
                            placeholder="Event Description"
                            required
                        />
                        <label htmlFor="file-upload" className="file-upload-label">
                            <i className="fas fa-upload"></i>
                            <input
                                id="file-upload"
                                type="file"
                                multiple
                                name="imageFiles"
                                onChange={handleFileChange}
                                className="file-input"
                            />
                        </label>
                        <div>
                            {files.length > 0 && (
                                <div className="file-names">
                                    {files.map((file, index) => (
                                        <span key={index}>{file.name}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button type="submit">{editMode ? 'Update Event' : 'Add Event'}</button>
                    </form>
                    <h3>Manage Existing Events</h3>
                    <ul className="event-list">
                        {events.map(event => (
                            <li key={event.id}>
                                <h4>{event.name}</h4>
                                <p>{event.description}</p>
                                <div className="event-images">
                                    {event.imageUrls && event.imageUrls.map((url, index) => (
                                        <img key={index} src={url} alt={event.name} style={{ maxWidth: '200px', margin: '5px' }} />
                                    ))}
                                </div>
                                <button onClick={() => handleEdit(event)}>Edit</button>
                                <button onClick={() => handleDelete(event.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={handleCloseModal}>&times;</span>
                                <form onSubmit={handleSubmit} className="add-event-form">
                                    <input
                                        type="text"
                                        name="name"
                                        value={event.name}
                                        onChange={handleInputChange}
                                        placeholder="Event Name"
                                        required
                                    />
                                    <textarea
                                        name="description"
                                        value={event.description}
                                        onChange={handleInputChange}
                                        placeholder="Event Description"
                                        required
                                    />
                                    <label htmlFor="file-upload-modal" className="file-upload-label">
                                        <i className="fas fa-upload"></i>
                                        <input
                                            id="file-upload-modal"
                                            type="file"
                                            multiple
                                            name="imageFiles"
                                            onChange={handleFileChange}
                                            className="file-input"
                                        />
                                    </label>
                                    <button type="submit">{editMode ? 'Update Event' : 'Add Event'}</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>You do not have permission to view this page</p>
            )}
        </div>
    );
};

export default ManageEvents;