import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './ViewUser.css';

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [user] = useAuthState(auth);
  const [volunteerForms, setVolunteerForms] = useState({});
  const [selectedVolunteer, setSelectedVolunteer] = useState(null); // State for the selected volunteer
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList.filter(u => u.id !== user.uid && u.email !== user.email)); // Exclude the current user
    };

    const fetchVolunteerForms = async () => {
      const querySnapshot = await getDocs(collection(db, 'volunteers'));
      const forms = {};
      querySnapshot.forEach(doc => {
        forms[doc.data().email] = doc.data(); // Use email as the key
      });
      setVolunteerForms(forms);
    };

    fetchUsers();
    fetchVolunteerForms();
  }, [user]);

  const handleDeleteUser = async (userId) => {
    if (userId === user.uid) {
      alert("You cannot delete yourself.");
      return;
    }

    await deleteDoc(doc(db, 'users', userId));
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleToggleAdmin = async (userId, isAdmin) => {
    if (userId === user.uid) {
      alert("You cannot change your own admin status.");
      return;
    }

    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      alert("User document does not exist.");
      return;
    }

    await updateDoc(userDocRef, {
      isAdmin: !isAdmin
    });

    setUsers(users.map(u => u.id === userId ? { ...u, isAdmin: !isAdmin } : u));
  };

  const handleToggleVolunteerStatus = async (userId, currentStatus) => {
    let newStatus;

    if (currentStatus === 'signed') {
      newStatus = 'true'; // Accept the volunteer
    } else if (currentStatus === 'true') {
      newStatus = 'false'; // Revoke volunteer status
    } else if (currentStatus === 'false') {
      newStatus = 'true'; // Restore volunteer status
    } else {
      return; // If current status is 'notVolunteering', do nothing
    }

    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      alert("User document does not exist.");
      return;
    }

    await updateDoc(userDocRef, {
      isVolunteer: newStatus
    });

    setUsers(users.map(u => u.id === userId ? { ...u, isVolunteer: newStatus } : u));
  };

  const handleGoToHomepage = () => {
    navigate('/'); // Navigate to home page
  };

  const handleGoToAdminDashboard = () => {
    navigate('/admin/dashboard'); // Navigate to admin dashboard page
  };

  const handleViewVolunteerForm = (email) => {
    setSelectedVolunteer(volunteerForms[email]);
  };

  const handleCloseModal = () => {
    setSelectedVolunteer(null);
  };

  return (
    <div className="view-user">
      <header className="admin-header">
        <h1>View User</h1>
        {user && (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleGoToHomepage} className="button homepage-button">Go to Homepage</button>
            <button onClick={handleGoToAdminDashboard} className="button dashboard-button">Go to Admin Home</button>
          </>
        )}
      </header>
      <div>
        <p>Here you can see your users.</p>
        <ul>
          {users.map(u => (
            <li key={u.id}>
              {u.email} - {u.isAdmin ? "Admin" : "Not Admin"} - {u.isVolunteer}
              <div className="button-container">
                <button onClick={() => handleDeleteUser(u.id)} className="button delete-button">Delete</button>
                <button onClick={() => handleToggleAdmin(u.id, u.isAdmin)} className="button action-button">
                  {u.isAdmin ? "Revoke Admin" : "Make Admin"}
                </button>
                {volunteerForms[u.email] && (
                  <button onClick={() => handleViewVolunteerForm(u.email)} className="button action-button">View Volunteer Form</button>
                )}
                {u.isVolunteer !== 'notVolunteering' && (
                  <button onClick={() => handleToggleVolunteerStatus(u.id, u.isVolunteer)} className="button action-button">
                    {u.isVolunteer === 'signed' ? "Accept Volunteer" : u.isVolunteer === 'true' ? "Revoke Volunteer Status" : "Restore Volunteer Status"}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        {selectedVolunteer && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              <h3>Volunteer Form:</h3>
              <p><strong>Name:</strong> {selectedVolunteer.firstName} {selectedVolunteer.lastName}</p>
              <p><strong>Email:</strong> {selectedVolunteer.email}</p>
              <p><strong>City:</strong> {selectedVolunteer.city}</p>
              <p><strong>Phone:</strong> {selectedVolunteer.phone}</p>
              <p><strong>Has Car:</strong> {selectedVolunteer.hasCar ? 'Yes' : 'No'}</p>
              <p><strong>Comments:</strong> {selectedVolunteer.comments}</p>
              <p><strong>Volunteer Regularly:</strong> {selectedVolunteer.volunteerRegularly}</p>
              <p><strong>Volunteer Options:</strong> {selectedVolunteer.volunteerOptions.join(', ')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUser;
