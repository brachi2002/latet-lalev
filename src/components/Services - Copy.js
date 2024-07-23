import React from 'react';
import Navbar from './Navbar';
import './services.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useTranslation } from 'react-i18next'; 

const servicesData = [
    { 
        title: 'Food Baskets & Shopping Cards', 
        description: 'This service provides essential food supplies to needy families, especially during holidays when expenses can be higher. The program offers food baskets containing staple items and shopping cards that families can use to purchase fresh produce, dairy, and other necessities. This ensures that families can maintain a balanced diet and celebrate holidays with dignity.', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2F3.jpg?alt=media']
    },
    { 
        title: 'Job & Training Support', 
        description: 'This service aims to help new immigrants integrate into the workforce by providing comprehensive support. It includes assistance in job searching, resume writing, and interview preparation. Additionally, the program offers vocational training to enhance skills relevant to the job market. Ongoing accompaniment is provided to ensure that individuals can successfully adapt to their new work environments and progress in their careers.', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2F3.jpg?alt=media']
    },
    { 
        title: 'Child Emotional Support', 
        description: 'Recognizing the emotional challenges faced by children in new environments, this service subsidizes professional emotional treatments and therapy. It also ensures that children are well-equipped for school by distributing necessary stationery and school supplies. Seasonal clothing distributions are also organized to provide appropriate attire for winter and summer, helping children feel comfortable and confident throughout the year.', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2F3.jpg?alt=media']
    },
    { 
        title: 'Clothing Distribution Center', 
        description: 'This service operates a center that offers both second-hand and new clothes to families in need. The clothing center is stocked with a wide variety of items suitable for all ages and seasons. Families can visit the center to select clothes that fit their needs and preferences. Additionally, the center organizes periodic distributions where clothes are delivered directly to family homes, ensuring access for those who may have mobility issues or lack transportation.', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2F3.jpg?alt=media']
    },
    { 
        title: 'Hospital Transportation Service', 
        description: 'Providing free transportation to and from hospitals, this service ensures that individuals can access medical care without the barrier of transportation costs. The service is available for routine check-ups, emergency visits, and ongoing treatments, making healthcare more accessible for those who might otherwise struggle to get to their appointments.', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2F3.jpg?alt=media']
    },
    { 
        title: 'Maternity Assistance', 
        description: 'This service offers comprehensive support to new mothers, including prenatal and postnatal care. It provides access to maternity supplies, nutritional guidance, and parenting resources. Additionally, the program offers emotional support and counseling to help new mothers navigate the challenges of motherhood, ensuring both the mother and baby are healthy and well-cared for.', 
        imageUrls: ['https://firebasestorage.googleapis.com/v0/b/project-d56a6.appspot.com/o/images%2F3.jpg?alt=media']
    },
];

function Services({ isAdmin }) {
    const { t } = useTranslation();
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="App">
            <Navbar user={user} isAdmin={isAdmin} />
            <div className="services">
                <h1>{t('services')}</h1>
                <ul className="service-list">
                    {servicesData.map((service, index) => (
                        <li key={index} className="service-item">
                            <div className="service-card">
                                {service.imageUrls && service.imageUrls.length > 0 ? (
                                    <img src={service.imageUrls[0]} alt={service.title} className="service-image" />
                                ) : (
                                    <div className="placeholder-image">{t('no_image')}</div>
                                )}
                                <div className="service-content">
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Services;
