import React from 'react';
import './Donations.css'; // Import CSS for styling
import bitQR from './images/qr-nedarim.png';
import payboxQR from './images/qr-nedarim.png';
import paypalQR from './images/qr-nedarim.png';
import nedarimPlusQR from './images/qr-nedarim.png';
import { useTranslation } from 'react-i18next';
import {auth} from '../firebase';
import Navbar from './Navbar'; // Import the Navbar component
import { useAuthState } from 'react-firebase-hooks/auth';
import { Helmet } from 'react-helmet';



const Donations = ({isAdmin }) => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  return (
    <div>
      <Helmet>
        <title>Donations | Latet lalev</title>
      </Helmet>
      <Navbar user={user} isAdmin={isAdmin} /> {/* Add Navbar here */}
      <div className="donation-container">
        <h1>{t('donate_to_our_association')}</h1>
        <p>{t('your_support_is_crucial')}</p>
        <div className="donation-methods">
          <div className="donation-method">
            <h2>{t('donate_via_bit')}</h2>
            <a href="https://bit-link.com/donate" target="_blank" rel="noopener noreferrer">
              <img src={bitQR} alt={t('bit_qr_code')} className="qr-code"/>
            </a>
          </div>
          <div className="donation-method">
            <h2>{t('donate_via_paybox')}</h2>
            <a href="https://paybox-link.com/donate" target="_blank" rel="noopener noreferrer">
              <img src={payboxQR} alt={t('paybox_qr_code')} className="qr-code"/>
            </a>
          </div>
          <div className="donation-method">
            <h2>{t('donate_via_paypal')}</h2>
            <a href="https://paypal-link.com/donate" target="_blank" rel="noopener noreferrer">
              <img src={paypalQR} alt={t('paypal_qr_code')} className="qr-code"/>
            </a>
          </div>
          <div className="donation-method">
            <h2>{t('donate_via_nedarim_plus')}</h2>
            <a href="https://www.matara.pro/nedarimplus/online/?mosad=7006412" target="_blank" rel="noopener noreferrer">
              <img src={nedarimPlusQR} alt={t('nedarim_plus_qr_code')} className="qr-code"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;