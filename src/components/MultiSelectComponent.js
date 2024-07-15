import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { db } from '../firebase'; // ודא שהייבוא נכון
import { collection, getDocs } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';//a

const MultiSelectComponent = ({ selected, setSelected }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'volunteerOptions'));
        const optionsData = querySnapshot.docs.map(doc => ({
          label: doc.data().option, // שינוי ל-option
          value: doc.id,
        }));
        setOptions(optionsData);
      } catch (error) {
        console.error("Error fetching volunteer options: ", error);
      }
    };

    fetchOptions();
  }, []);
  const { t } = useTranslation();//a
  return (
    <MultiSelect
      options={options}
      value={selected}
      onChange={setSelected}
      labelledBy="Select"
    />
  );
};

export default MultiSelectComponent;
