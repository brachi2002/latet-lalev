import React, { useState, useEffect } from 'react';//a
import { useTranslation } from 'react-i18next';//a
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import VolunteerForm from './components/VolunteerForm';
import VolunteerList from './components/VolunteerList';
import AdminAddVolunteerOption from './components/AdminAddVolunteerOption';
import ManageEvents from './components/ManageEvents';
import ContactRequests from './components/ContactRequests'; // Update the path as needed
import AdminDashboard from './components/AdminDashboard';
import ViewUser from './components/ViewUser'; // ייבוא רכיב ViewUser
import './styles.css';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import ProtectedRoute from './components/ProtectedRoute'; // ייבוא ה- ProtectedRoute
import './styles.css';

function App() {
  //a
  const { i18n } = useTranslation();
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  useEffect(() => {
    document.body.dir = i18n.language === 'he' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const toggleLanguageOptions = () => {
    setShowLanguageOptions(!showLanguageOptions);
  };
  //a
  return (
    <Router>
       <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="volunteer" element={<ProtectedRoute><VolunteerForm /></ProtectedRoute>} />
          <Route path="/admin/volunteers" element={<VolunteerList />} />
          <Route path="/events" element={<Events />} />
          <Route path="/services" element={<Events />} />
          <Route path="/branches" element={<Events />} />
          <Route path="/ourStory" element={<AboutUs />} />
          <Route path="/contactUs" element={<Events />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/add-volunteer-option" element={<AdminAddVolunteerOption />} />
          <Route path="/admin/manage-events" element={<ManageEvents />} />
          <Route path="/admin/view-requests" element={<ContactRequests />} /> {/* Updated */}
          {/* <Route path="/admin/volunteer-list" element={<ProtectedRoute><VolunteerList /></ProtectedRoute>} /> */}
          <Route path="/admin/view-user" element={<ProtectedRoute><ViewUser /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
