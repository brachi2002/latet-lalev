import React from 'react';
import { useTranslation } from 'react-i18next';
import './Loading.css'; // Optional: Create this CSS file for custom styles

const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>{t('loading')}</p>
    </div>
  );
};

export default Loading;
