import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
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
import Endorsement from './components/Endorsement';
import Rabbi from './components/Rabbi';
import ProtectedRoute from './components/ProtectedRoute';
import VolunteerPopup from './components/VolunteerPopup';
import ManageQr from './components/ManageQr';
import Messages from './components/Messages';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './i18n';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (i18n.language === 'he') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [i18n.language]);

  return (
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
        <Route path="/events" element={<Events />} />
        <Route path="/popup" element={<VolunteerPopup />} />
        <Route path="/services" element={<MyServices />} />
        <Route path="/branches" element={<Events />} />
        <Route path="/ourStory" element={<AboutUs />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/admin/manage-qr" element={<ProtectedRoute><ManageQr /></ProtectedRoute>} />
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
  );
}

export default App;
