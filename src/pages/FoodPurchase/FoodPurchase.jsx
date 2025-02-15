import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthProvider';
import '../../styles/FoodPurchase.css';

const FoodPurchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`/api/foods/${id}`);
        setFood(response.data);
        setIsAvailable(response.data.quantity > 0);
      } catch (error) {
        console.error('Error fetching food:', error);
      }
    };

    fetchFood();
  }, [id]);

  const handlePurchase = async () => {
    try {
      const purchaseData = {
        foodId: food._id,
        foodName: food.name,
        price: food.price,
        quantity,
        buyerName: currentUser.displayName,
        buyerEmail: currentUser.email,
      };

      await axios.post('/api/purchase', purchaseData);

      Swal.fire({
        title: 'Purchase Successful!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      window.dispatchEvent(new CustomEvent('purchaseSuccess'));

      navigate(`/food/${id}`);
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
    <div className="food-purchase-container">
      <h1 className="text-center text-3xl font-bold mb-6">Purchase {food.name}</h1>
      <div className="purchase-form">
        <div className="food-image-container">
          <img src={food.image} alt={food.name} className="food-image" />
        </div>
        <div className="food-details-container">
          <p><strong>Food Name:</strong> {food.name}</p>
          <p><strong>Price:</strong> ${food.price}</p>
          <div className="quantity-input">
            <label><strong>Quantity:</strong></label>
            <input 
              type="number" 
              value={quantity} 
              min="1" 
              max={food.quantity} 
              onChange={(e) => setQuantity(Math.min(e.target.value, food.quantity))} 
            />
          </div>
          <p><strong>Buyer Name:</strong> {currentUser.displayName}</p>
          <p><strong>Buyer Email:</strong> {currentUser.email}</p>
          {!isAvailable && <p className="error-message">This item is not available for purchase.</p>}
          <button 
            onClick={handlePurchase} 
            className="purchase-button" 
            disabled={!isAvailable || quantity > food.quantity}
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodPurchase;