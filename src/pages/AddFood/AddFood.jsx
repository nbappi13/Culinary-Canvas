import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { addFood } from '../../services/foodService';
import Swal from 'sweetalert2';
import '../../styles/AddFood.css';

const AddFood = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    category: '',
    quantity: 0,
    price: 0.0,
    origin: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newFood = {
      ...formData,
      addedBy: currentUser.displayName,
      email: currentUser.email,
    };

    try {
      await addFood(newFood);
      Swal.fire({
        title: 'Food added successfully!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      
      setFormData({
        name: '',
        image: '',
        category: '',
        quantity: 0,
        price: 0.0,
        origin: '',
        description: '',
      });
    } catch (error) {
      console.error('Failed to add food:', error);
      Swal.fire({
        title: 'Failed to add food!',
        text: error.message || 'An unexpected error occurred.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="add-food-page">
      <h1>Add Food</h1>
      <form onSubmit={handleSubmit} className="add-food-form">
        <label>
          Food Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Food Image:
          <input type="text" name="image" value={formData.image} onChange={handleChange} required />
        </label>
        <label>
          Food Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>
        <label>
          Food Origin (Country):
          <input type="text" name="origin" value={formData.origin} onChange={handleChange} required />
        </label>
        <label>
          Short Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddFood;