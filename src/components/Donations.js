import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import { Helmet } from 'react-helmet';
import './Donations.css';

const Donations = ({ isAdmin }) => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  const [donationMethods, setDonationMethods] = useState([]);

  useEffect(() => {
    const fetchDonationsData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Donations'));
      const methods = await Promise.all(
        querySnapshot.docs.map(async doc => {
          const data = doc.data();
          const name = data.name || 'Unknown'; // Provide a default value for name
          try {
            const qrPicUrl = await getDownloadURL(ref(getStorage(), data.pic));
            return { ...data, name, qrPicUrl };
          } catch (error) {
            console.error(`Error fetching QR code image for ${name}:`, error);
            return { ...data, name, qrPicUrl: '' }; // Handle missing image by setting an empty URL or a default image
          }
        })
      );
      setDonationMethods(methods);
    };

    fetchDonationsData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Donations | Latet lalev</title>
      </Helmet>
      <Navbar user={user} isAdmin={isAdmin} />
      <div className="donation-container">
        <h1>{t('donate_to_our_association')}</h1>
        <p>{t('your_support_is_crucial')}</p>
        <div className="donation-methods">
          {donationMethods.map((method, index) => (
            <div className="donation-method" key={index}>
              <h2>{t(`donate_via_${method.name.toLowerCase()}`)}</h2>
              <a href={method.url} target="_blank" rel="noopener noreferrer">
                {method.qrPicUrl ? (
                  <img src={method.qrPicUrl} alt={`${method.name} QR code`} className="qr-code" />
                ) : (
                  <p>{t('no_qr_code_available')}</p>
                )}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donations;
