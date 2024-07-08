// AddVolunteerOption.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddVolunteerOption = () => {
    const [volunteerOption, setVolunteerOption] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'volunteerOptions'), {
                volunteerOption,
            });
            alert('האפשרות להתנדבות נוספה בהצלחה!');
            navigate('/'); // לחזור לדף הבית אחרי הוספה מוצלחת
        } catch (error) {
            console.error('שגיאה בהוספת אפשרות התנדבות: ', error);
        }
    };

    return (
        <div>
            <h2>הוספת אפשרות התנדבות חדשה</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={volunteerOption}
                    onChange={(e) => setVolunteerOption(e.target.value)}
                    placeholder="אפשרות התנדבות"
                    required
                />
                <button type="submit">הוסף אפשרות</button>
            </form>
        </div>
    );
};

export default AddVolunteerOption;
