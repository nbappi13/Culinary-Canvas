import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useUpdateFood } from '../../services/foodService';
import { useAuth } from '../../context/AuthProvider';
import '../../styles/UpdateFoodModal.css';

Modal.setAppElement('#root');

const UpdateFoodModal = ({ food, onSuccess, onClose }) => {
  const { currentUser } = useAuth();
  const updateFoodMutation = useUpdateFood();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    category: '',
    quantity: '',
    price: '',
    description: { shortDescription: '', foodOrigin: '' },
  });

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (food) {
      setFormData({
        ...food,
        description: {
          shortDescription: food.description?.shortDescription || '',
          foodOrigin: food.description?.foodOrigin || '',
        },
      });
    }
  }, [food]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.description) {
      setFormData((prevData) => ({
        ...prevData,
        description: { ...prevData.description, [name]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    const updatedFoodData = {
      name: formData.name,
      image: formData.image,
      category: formData.category,
      quantity: parseInt(formData.quantity, 10),
      price: parseFloat(formData.price),
      description: {
        shortDescription: formData.description.shortDescription,
        foodOrigin: formData.description.foodOrigin,
      },
    };

    try {
      await updateFoodMutation.mutateAsync({
        id: food._id,
        foodData: updatedFoodData,
        email: currentUser.email,
      });

      Swal.fire({
        title: 'Update Successful!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      onSuccess(); 
    } catch (error) {
      console.error('Error updating food:', error.message);
    } finally {
      setIsUpdating(false);
      onClose(); 
    }
  };

  return (
    <Modal
      isOpen={!!food}
      onRequestClose={onClose}
      contentLabel="Update Food"
      className="update-food-modal"
      overlayClassName="update-food-overlay"
    >
      <div className="modal-content">
        <h2>Update Food</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={isUpdating} />
            </label>
            <label>
              Price:
              <input type="number" name="price" value={formData.price} onChange={handleChange} disabled={isUpdating} />
            </label>
          </div>

          <div className="form-group">
            <label>
              Quantity:
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} disabled={isUpdating} />
            </label>
            <label>
              Category:
              <input type="text" name="category" value={formData.category} onChange={handleChange} disabled={isUpdating} />
            </label>
          </div>

          <div className="form-group">
            <label>
              Image URL:
              <input type="text" name="image" value={formData.image} onChange={handleChange} disabled={isUpdating} />
            </label>
            <label>
              Origin:
              <input type="text" name="foodOrigin" value={formData.description.foodOrigin} onChange={handleChange} disabled={isUpdating} />
            </label>
          </div>

          <label>
            Description:
            <textarea name="shortDescription" value={formData.description.shortDescription} onChange={handleChange} disabled={isUpdating} />
          </label>

          <div className="modal-footer">
            <button type="submit" disabled={isUpdating}>{isUpdating ? 'Updating...' : 'Update'}</button>
            <button type="button" onClick={onClose} disabled={isUpdating}>Close</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateFoodModal;