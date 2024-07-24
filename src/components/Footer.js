import React from 'react';
import { useTranslation } from 'react-i18next';
import './footer.css'; // Ensure this path is correct

const Footer = () => {
    const { t, i18n } = useTranslation(); 
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>{t('latat_balev')}</h4>
                    <p>{t('em1')}</p>
                    <p>{t('phone3')}</p>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()}
                {t('text3')}
            </div>
        </footer>
    );
}

export default Footer;
