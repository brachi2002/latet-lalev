import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import {auth, db } from '../firebase';
import Navbar from './Navbar';
import './services.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';

function Services({isAdmin }) {
    const { t } = useTranslation();
    const [user] = useAuthState(auth);

    return (
        <div className="App">
          <Navbar
            user={user}
            isAdmin={isAdmin}
          />
          <div className="services">
            
                
           
          </div>
        </div>
      );
    }
    
    export default Services;
    