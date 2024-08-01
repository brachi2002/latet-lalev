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
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList.filter(u => u.id !== user.uid)); // Exclude the current user
    };

    const fetchVolunteerForms = async () => {
      const querySnapshot = await getDocs(collection(db, 'volunteers'));
      const forms = {};
      querySnapshot.forEach(doc => {
        forms[doc.id] = doc.data(); // Use user ID as the key
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectUser = async (userId) => {
    if (!userId) {
      console.error('Invalid userId:', userId);
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, 'volunteers', userId));
      if (userDoc.exists()) {
        setSelectedUser(userDoc.data());
      } else {
        console.log('No such document!');
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error fetching user document:', error);
      setSelectedUser(null);
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Admin Status</th>
              <th>Volunteer Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>
                  {u.isAdmin ? "Admin" : "Not Admin"}
                  <div className="button-container">
                    <button onClick={() => handleToggleAdmin(u.id, u.isAdmin)} className="button action-button">
                      {u.isAdmin ? "Cancel Admin" : "Make Admin"}
                    </button>
                  </div>
                </td>
                <td>
                  {u.isVolunteer}
                  {u.isVolunteer !== 'notVolunteering' && (
                    <div className="button-container">
                      <button onClick={() => handleToggleVolunteerStatus(u.id, u.isVolunteer)} className="button action-button">
                        {u.isVolunteer === 'signed' ? "Accept Volunteer" : u.isVolunteer === 'true' ? "Reject volunteer" : "Approve volunteer"}
                      </button>
                    </div>
                  )}
                  {volunteerForms[u.id] && (
                    <div className="button-container">
                      <button className="view-form-button" onClick={() => handleSelectUser(u.id)}>View Volunteer Form</button>
                    </div>
                  )}
                </td>
                <td>
                  <div className="button-container">
                    <button onClick={() => handleDeleteUser(u.id)} className="button delete-button">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedUser && (
          <div className="volunteer-form-popup">
            <div className="volunteer-form-content">
              <button className="close-popup" onClick={() => handleCloseModal()}>X</button>
              <h4>Volunteer Form</h4>
              <p>Name: {selectedUser.firstName} {selectedUser.lastName}</p>
              <p>Email: {selectedUser.email}</p>
              <p>Age: {selectedUser.age}</p>
              <p>City: {selectedUser.city}</p>
              <p>Gender: {selectedUser.gender}</p>
              <p>Phone: {selectedUser.phone}</p>
              <p>Has Car: {selectedUser.hasCar ? 'Yes' : 'No'}</p>
              <p>Comments: {selectedUser.comments}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUser;
