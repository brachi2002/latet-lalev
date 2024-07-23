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
        title: 'Child Emotional Support', 
        description: 'Recognizing the emotional challenges faced by children in new environments, this service subsidizes professional emotional treatments and therapy. It also ensures that children are well-equipped for school by distributing necessary stationery and school supplies. Seasonal clothing distributions are also organized to provide appropriate attire for winter and summer, helping children feel comfortable and confident throughout the year.', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2FChild.jpg?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'],
        icon: faChild
    },
    { 
        title: 'Job & Training Support', 
        description: 'This service aims to help new immigrants integrate into the workforce by providing comprehensive support. It includes assistance in job searching, resume writing, and interview preparation. Additionally, the program offers vocational training to enhance skills relevant to the job market. Ongoing accompaniment is provided to ensure that individuals can successfully adapt to their new work environments and progress in their careers.', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2FJob.jpg?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'],
        icon: faBriefcase
    },
    { 
        title: 'Clothing Distribution Center', 
        description: 'This service operates a center that offers both second-hand and new clothes to families in need. The clothing center is stocked with a wide variety of items suitable for all ages and seasons. Families can visit the center to select clothes that fit their needs and preferences. Additionally, the center organizes periodic distributions where clothes are delivered directly to family homes, ensuring access for those who may have mobility issues or lack transportation.', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2FClothing.jpg?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'],
        icon: faTshirt
    },
    { 
        title: 'Hospital Transportation Service', 
        description: 'Providing free transportation to and from hospitals, this service ensures that individuals can access medical care without the barrier of transportation costs. The service is available for routine check-ups, emergency visits, and ongoing treatments, making healthcare more accessible for those who might otherwise struggle to get to their appointments.', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2Fhospital.jpg?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'],
        icon: faAmbulance
    },
    { 
        title: 'Maternity Assistance', 
        description: 'This service offers comprehensive support to new mothers, including prenatal and postnatal care. It provides access to maternity supplies, nutritional guidance, and parenting resources. Additionally, the program offers emotional support and counseling to help new mothers navigate the challenges of motherhood, ensuring both the mother and baby are healthy and well-cared for.', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2FMaternity.jpg?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'],
        icon: faBabyCarriage
    },
    { 
        title: 'Food Baskets & Shopping Cards', 
        description: 'This service provides essential food supplies to needy families, especially during holidays when expenses can be higher. The program offers food baskets containing staple items and shopping cards that families can use to purchase fresh produce, dairy, and other necessities. This ensures that families can maintain a balanced diet and celebrate holidays with dignity.', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2FFood.jpg?alt=media&token=b729413f-6418-4294-9d85-7fb9d805df1e'],
        icon: faUtensils
    },
];

function Services({ isAdmin }) {
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
             <Helmet>
        <title>Services | Latet lalev</title>
      </Helmet>
            <Navbar user={user} isAdmin={isAdmin} />
            <div className="services">
                <div className="services-icons">
                    {servicesData.map((service, index) => (
                        <a key={index} href={`#service-${index}`} className="service-icon-link">
                            <FontAwesomeIcon icon={service.icon} size="3x" className="service-icon" />
                            <p>{service.title}</p>
                        </a>
                    ))}
                </div>
                <div className="service-grid">
                    {servicesData.map((service, index) => (
                        <div key={index} id={`service-${index}`} className="service-card">
                            <img src={service.imageUrls[0]} alt={service.title} className="service-image" />
                            <div className="service-content">
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-description">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Services;
