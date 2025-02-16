import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import privateDiningImage from '../../assets/private_dining.jpg';
import '../../styles/PrivateDining.css';

const PrivateDining = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBookNow = () => {
    if (currentUser) {
      navigate('/book-now');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="private-dining-container" style={{ backgroundImage: `url(${privateDiningImage})` }}>
      <div className="overlay">
        <h2 className="private-dining-title">PRIVATE DINING</h2>
        <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
};

export default PrivateDining;