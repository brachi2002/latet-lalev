import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import VolunteerForm from './components/VolunteerForm';
import VolunteerList from './components/VolunteerList';
import AdminAddVolunteerOption from './components/AdminAddVolunteerOption';
import ManageEvents from './components/ManageEvents';
import AdminDashboard from './components/AdminDashboard';
import './styles.css';
import Events from './components/Events';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/volunteer" element={<VolunteerForm />} />
          <Route path="/volunteers" element={<VolunteerList />} />
          <Route path="/events" element={<Events />} />
          <Route path="/services" element={<Events />} />
          <Route path="/branches" element={<Events />} />
          <Route path="/our Story" element={<Events />} />
          <Route path="/contact Us" element={<Events />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-volunteer-option" element={<AdminAddVolunteerOption />} />
          <Route path="/admin/manage-events" element={<ManageEvents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
