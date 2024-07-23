import React from 'react';
import Navbar from './Navbar';
import './services.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useTranslation } from 'react-i18next'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faBriefcase, faChild, faTshirt, faAmbulance, faBabyCarriage } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';

const servicesData = [
    { 
        title: 'child_emotional_support', 
        description: 'child_emotional_support_description', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2FChild.jpg?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'],
        icon: faChild
    },
    { 
        title: 'job_training_support', 
        description: 'job_training_support_description', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2FJob.jpg?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'],
        icon: faBriefcase
    },
    { 
        title: 'clothing_distribution_center', 
        description: 'clothing_distribution_center_description', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2FClothing.jpg?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'],
        icon: faTshirt
    },
    { 
        title: 'hospital_transportation_service', 
        description: 'hospital_transportation_service_description', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2Fhospital.jpg?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'],
        icon: faAmbulance
    },
    { 
        title: 'maternity_assistance', 
        description: 'maternity_assistance_description', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2FMaternity.jpg?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'],
        icon: faBabyCarriage
    },
    { 
        title: 'food_baskets_shopping_cards', 
        description: 'food_baskets_shopping_cards_description', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2FFood.jpg?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'],
        icon: faUtensils
    },
];

function MyServices({ isAdmin }) {
    const { t } = useTranslation();
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error.message}</div>;
    }

    return (
        
        <div className="services-container">
          <Navbar user={user} isAdmin={isAdmin} />

            <Helmet>
                <title>Services | Latet lalev</title>
            </Helmet>
            <div className="services">
                <div className="services-icons">
                    {servicesData.map((service, index) => (
                        <a key={index} href={`#service-${index}`} className="service-icon-link">
                            <FontAwesomeIcon icon={service.icon} size="3x" className="service-icon" />
                            <p>{t(service.title)}</p>
                        </a>
                    ))}
                </div>
                <div className="service-grid">
                    {servicesData.map((service, index) => (
                        <div key={index} id={`service-${index}`} className="service-card">
                            <img src={service.imageUrls[0]} alt={t(service.title)} className="service-image" />
                            <div className="service-content">
                                <h3 className="service-title">{t(service.title)}</h3>
                                <p className="service-description">{t(service.description)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyServices;
