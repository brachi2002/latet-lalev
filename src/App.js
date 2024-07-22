import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import VolunteerForm from './components/VolunteerForm';
import VolunteerList from './components/VolunteerList';
import AdminAddVolunteerOption from './components/AdminAddVolunteerOption';
import ManageEvents from './components/ManageEvents';
import ContactRequests from './components/ContactRequests';
import AdminDashboard from './components/AdminDashboard';
import ViewUser from './components/ViewUser';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import Donations from './components/Donations';
import Services from './components/Services';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import './styles.css';

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
          <Route path="/admin/volunteers" element={<ProtectedRoute><VolunteerList /></ProtectedRoute>} />
          <Route path="/events" element={<Events />} />
          <Route path="/services" element={<Services />} />
          <Route path="/branches" element={<Events />} />
          <Route path="/ourStory" element={<AboutUs />} />
          {/* <Route path="/contactUs" element={<Events />} /> */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/add-volunteer-option" element={<ProtectedRoute><AdminAddVolunteerOption /></ProtectedRoute>} />
          <Route path="/admin/manage-events" element={<ProtectedRoute><ManageEvents /></ProtectedRoute>} />
          <Route path="/admin/view-requests" element={<ProtectedRoute><ContactRequests /></ProtectedRoute>} />
          <Route path="/admin/view-user" element={<ProtectedRoute><ViewUser /></ProtectedRoute>} />
          <Route path="/donate" element={<Donations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
