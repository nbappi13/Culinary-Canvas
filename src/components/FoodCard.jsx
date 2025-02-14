import React from 'react';

const FoodCard = ({ food }) => {
  return (
    <div className="food-card p-4 border rounded shadow-md">
      <img src={food.image} alt={food.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-bold mb-2">{food.name}</h2>
      <p className="mb-2">{food.description.shortDescription}</p>
      <button className="details-button bg-blue-500 text-white py-2 px-4 rounded">Details</button>
    </div>
  );
};

export default FoodCard;