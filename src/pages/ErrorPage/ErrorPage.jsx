import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-title">404</h1>
      <p className="error-message">Oops! The page you are looking for does not exist...🙄</p>
      <Link to="/" className="error-link">Go Back Home 😭💀</Link>
    </div>
  );
};

export default ErrorPage;