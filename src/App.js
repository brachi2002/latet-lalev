import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage'; // If the Navbar is a separate component, otherwise it can be removed
import Home from './components/Home'; // Ensure this points to the new `homepage.js` file
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import VolunteerForm from './components/VolunteerForm';
import VolunteerList from './components/VolunteerList';
import AdminAddVolunteerOption from './components/AdminAddVolunteerOption';
import ManageEvents from './components/ManageEvents';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Homepage />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/volunteer" element={<VolunteerForm />} />
          <Route path="/volunteers" element={<VolunteerList />} />
          <Route path="/add-volunteer-option" element={<AdminAddVolunteerOption />} />
          <Route path="/manage-events" element={<ManageEvents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
