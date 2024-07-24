import React from 'react';
import './footer.css'; // Ensure this path is correct

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>לתת ללב</h4>
                    <p>אימייל: latetlalev70@gmail.com</p>
                    <p>טלפון: +123 456 7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} כל הזכויות שמורות לעמותת "לתת ללב" ארגון חסד לקהילה הלטינית בישראל (ע"ר)
            </div>
        </footer>
    );
}

export default Footer;
