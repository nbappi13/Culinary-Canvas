import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => {
  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} />
      <h2>{food.name}</h2>
      <p>{food.shortDescription}</p>
      <ul>
        {food.ingredients && food.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>{food.makingProcedure}</p>
      <Link to={`/food/${food._id}`} className="details-button">
        Details
      </Link>
    </div>
  );
};

export default FoodCard;