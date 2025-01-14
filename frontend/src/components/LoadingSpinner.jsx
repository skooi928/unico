import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Checking authorization...</p>
    </div>
  );
};

export default LoadingSpinner;