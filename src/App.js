import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import VolunteerForm from './components/VolunteerForm';
import VolunteerList from './components/VolunteerList';
import AdminAddVolunteerOption from './components/AdminAddVolunteerOption';
import ManageEvents from './components/ManageEvents';
import AdminDashboard from './components/AdminDashboard'; // ודא שיש לך רכיב כזה
import './styles.css';
import Events from './components/Events';
import ProtectedRoute from './components/ProtectedRoute'; // ייבוא רכיב ProtectedRoute

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/volunteer"
            element={
              <ProtectedRoute>
                <VolunteerForm />
              </ProtectedRoute>
            }
          />
          <Route path="/volunteers" element={<ProtectedRoute><VolunteerList /></ProtectedRoute>} />
          <Route path="/events" element={<Events />} />
          <Route path="/services" element={<Events />} />
          <Route path="/branches" element={<Events />} />
          <Route path="/our Story" element={<Events />} />
          <Route path="/contact Us" element={<Events />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/add-volunteer-option" element={<ProtectedRoute><AdminAddVolunteerOption /></ProtectedRoute>} />
          <Route path="/admin/manage-events" element={<ProtectedRoute><ManageEvents /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
