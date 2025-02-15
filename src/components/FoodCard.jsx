import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FoodCard.css';

const FoodCard = ({ food }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/food/${food._id}`);
  };

  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} className="food-image" />
      <h2 className="food-name">{food.name}</h2>
      <p className="food-shortDescription">{food.shortDescription}</p>
      <ul className="food-ingredients">
        {food.ingredients && food.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p className="food-makingProcedure">{food.makingProcedure}</p>
      <button onClick={handleDetailsClick} className="details-button">
        Details
      </button>
    </div>
  );
};

export default FoodCard;