import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import LanguageSupport from './components/LanguageSupport';
import VolunteerForm from './components/VolunteerForm';
import AdminEditAboutUs from './components/AdminEditAboutUs';
import AdminAddVolunteerOption from './components/AdminAddVolunteerOption';
import ManageEvents from './components/ManageEvents';
import ContactRequests from './components/ContactRequests';
import AdminDashboard from './components/AdminDashboard';
import ViewUser from './components/ViewUser';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import Donations from './components/Donations';
import MyServices from './components/MyServices';
import initTranslations from './i18n';
import Services from './components/Services';
import Endorsement from './components/Endorsement';
import Rabbi from './components/Rabbi';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import Popup from './components/VolunteerPopup'; // Import the ProtectedRoute component
import './styles.css';
import VolunteerPopup from './components/VolunteerPopup';
import Messages from './components/Messages';
import 'bootstrap/dist/css/bootstrap.min.css';




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
          {/* <Route path="/admin/volunteers" element={<ProtectedRoute><VolunteerList /></ProtectedRoute>} /> */}

          <Route path="/events" element={<Events />} />
          <Route path="/popup" element={<VolunteerPopup />} />
          <Route path="/services" element={<MyServices />} />
          <Route path="/branches" element={<Events />} />
          <Route path="/ourStory" element={<AboutUs />} />
          {/* <Route path="/contactUs" element={<Events />} /> */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          <Route path="/admin/add-volunteer-option" element={<ProtectedRoute><AdminAddVolunteerOption /></ProtectedRoute>} />
          <Route path="/admin/language-support" element={<ProtectedRoute><LanguageSupport /></ProtectedRoute>} />
          <Route path="/admin/edit-about-us" element={<ProtectedRoute><AdminEditAboutUs /></ProtectedRoute>} />
          <Route path="/admin/manage-events" element={<ProtectedRoute><ManageEvents /></ProtectedRoute>} />
          <Route path="/admin/view-requests" element={<ProtectedRoute><ContactRequests /></ProtectedRoute>} />
          <Route path="/admin/view-user" element={<ProtectedRoute><ViewUser /></ProtectedRoute>} />
          <Route path="/donate" element={<Donations />} />
          <Route path="/endorsement" element={<Endorsement />} />
          <Route path="/rabbi" element={<Rabbi />} />
        </Routes>
        
     
      </div>
    </Router>
  );
}

export default App;
