import React from 'react';
import './Loading.css'; // Optional: Create this CSS file for custom styles

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
