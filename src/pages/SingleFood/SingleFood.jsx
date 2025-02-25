import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/SingleFood.css";

const SingleFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [purchaseCount, setPurchaseCount] = useState(0);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(
          `https://b10-a11-server-side-chi.vercel.app/api/foods/${id}`
        );
        if (response.status === 200) {
          setFood(response.data);
          setPurchaseCount(response.data.purchaseCount || 0);
        } else {
          navigate("/not-found");
        }
      } catch (error) {
        console.error("Error fetching food:", error);
        navigate("/not-found");
      }
    };

    fetchFood();

    const handlePurchaseSuccess = async () => {
      try {
        const response = await axios.get(
          `https://b10-a11-server-side-chi.vercel.app/api/foods/${id}`
        );
        if (response.status === 200) {
          setFood(response.data);
          setPurchaseCount(response.data.purchaseCount || 0);
        }
      } catch (error) {
        console.error("Error fetching updated food:", error);
      }
    };

    window.addEventListener("purchaseSuccess", handlePurchaseSuccess);

    return () => {
      window.removeEventListener("purchaseSuccess", handlePurchaseSuccess);
    };
  }, [id, navigate]);

  const handlePurchaseClick = () => {
    navigate(`/purchase/${id}`);
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
          <p>
            <strong>Category:</strong> {food.category}
          </p>
          <p>
            <strong>Quantity:</strong> {food.quantity}
          </p>
          <p>
            <strong>Price:</strong> ${food.price}
          </p>
          <p>
            <strong>Purchase Count:</strong> {purchaseCount}
          </p>
          <p>
            <strong>Short Description:</strong>{" "}
            {food.description.shortDescription}
          </p>
          <p>
            <strong>Ingredients:</strong>
          </p>
          <ul>
            {food.description.ingredients &&
              food.description.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
          </ul>
          <p>
            <strong>Making Procedure:</strong>{" "}
            {food.description.makingProcedure}
          </p>
          <p>
            <strong>Food Origin:</strong> {food.foodOrigin}
          </p>
          <button onClick={handlePurchaseClick} className="purchase-button">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleFood;
