import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../styles/SingleFood.css';

const SingleFood = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [purchaseCount, setPurchaseCount] = useState(0);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`/api/foods/${id}`);
        setFood(response.data);
        setPurchaseCount(response.data.purchaseCount || 0);
      } catch (error) {
        console.error('Error fetching food:', error);
      }
    };

    fetchFood();
  }, [id]);

  const handlePurchase = async () => {
    try {
      await axios.post(`/api/foods/${id}/purchase`);
      setPurchaseCount((prevCount) => prevCount + 1);
      Swal.fire({
        title: 'Purchase Successful!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Purchase error:', error);
      Swal.fire({
        title: 'Purchase Failed!',
        text: 'An error occurred while making the purchase.',
        icon: 'error',
      });
    }
  };

  if (!food) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-food-container">
      <div className="food-card">
        <h1 className="food-name">{food.name}</h1>
        <img src={food.image} alt={food.name} className="food-image" />
        <div className="food-details">
          <p><strong>Category:</strong> {food.category}</p>
          <p><strong>Quantity:</strong> {food.quantity}</p>
          <p><strong>Price:</strong> ${food.price}</p>
          <p><strong>Purchase Count:</strong> {purchaseCount}</p>
          <p><strong>Short Description:</strong> {food.description.shortDescription}</p>
          <p><strong>Ingredients:</strong></p>
          <ul>
            {food.description.ingredients && food.description.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p><strong>Making Procedure:</strong> {food.description.makingProcedure}</p>
          <p><strong>Food Origin:</strong> {food.foodOrigin}</p>
          <button onClick={handlePurchase} className="purchase-button">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleFood;