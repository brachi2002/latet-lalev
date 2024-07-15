import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';//a

const ManageEvents = () => {
    const [event, setEvent] = useState({ name: '', description: '', imageUrls: [] });
    const [files, setFiles] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user] = useAuthState(auth);
    const [events, setEvents] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editEventId, setEditEventId] = useState(null);

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
                const storageRef = ref(storage, `images/${file.name}`);
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
    const { t } = useTranslation();//a
    return (
        <div>
            {isAdmin ? (
                <div>
                    <form onSubmit={handleSubmit}>
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
                        <input
                            type="file"
                            multiple
                            name="imageFiles"
                            onChange={handleFileChange}
                        />
                        <button type="submit">{editMode ? 'Update Event' : 'Add Event'}</button>
                    </form>
                    <h3>Manage Existing Events</h3>
                    <ul>
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
                </div>
            ) : (
                <p>You do not have permission to view this page</p>
            )}
        </div>
    );
};

export default ManageEvents;
