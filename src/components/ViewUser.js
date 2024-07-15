import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './ViewUser.css';

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList.filter(u => u.id !== user.uid)); // Exclude the current user
    };

    fetchUsers();
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

    await updateDoc(doc(db, 'users', userId), {
      isAdmin: !isAdmin
    });

    setUsers(users.map(u => u.id === userId ? { ...u, isAdmin: !isAdmin } : u));
  };

  const handleToggleVolunteerStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'notVolunteering' ? 'signed' : currentStatus === 'signed' ? 'true' : 'notVolunteering';

    await updateDoc(doc(db, 'users', userId), {
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

  return (
    <div className="view-user">
      <header className="admin-header">
        <h1>View User</h1>
        {user && (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={handleGoToHomepage} className="homepage-button">Go to Homepage</button>
            <button onClick={handleGoToAdminDashboard} className="dashboard-button">Go to Admin Home</button>
          </>
        )}
      </header>
      <div>
        <p>Here you can see your users.</p>
        <ul>
          {users.map(u => (
            <li key={u.id}>
              {u.email} - {u.isAdmin ? "Admin" : "Not Admin"} - {u.isVolunteer}
              <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
              <button onClick={() => handleToggleAdmin(u.id, u.isAdmin)}>
                {u.isAdmin ? "Revoke Admin" : "Make Admin"}
              </button>
              <button onClick={() => handleToggleVolunteerStatus(u.id, u.isVolunteer)}>
                {u.isVolunteer === 'notVolunteering' ? "Sign Up as Volunteer" : u.isVolunteer === 'signed' ? "Confirm Volunteer" : "Revoke Volunteer Status"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewUser;
