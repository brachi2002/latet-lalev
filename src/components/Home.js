import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Home = () => {
    const [user] = useAuthState(auth);

    // בדיקה האם המשתמש הוא אדמין
    const isAdmin = user && user.email === 'brachi3272@gmail.com'; // להחליף עם האימייל של האדמין

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>ברוכים הבאים לעמותת עולים חדשים</h1>
                <p>תמיכה וסיוע לעולים חדשים בארץ</p>
                <Link to="/services" className="main-button">גלה עוד</Link>
                {isAdmin && (
                    <div className="admin-panel">
                        <h3>תפריט אדמין</h3>
                        <ul>
                            <li><Link to="/volunteers">רשימת מתנדבים</Link></li>
                            <li><Link to="/add-volunteer-option">הוספת אפשרות התנדבות</Link></li>
                            <li><Link to="/manage-events">ניהול אירועים</Link></li>
                        </ul>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Home;
