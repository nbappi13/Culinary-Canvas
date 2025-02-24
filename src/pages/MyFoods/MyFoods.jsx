import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useMyFoods } from '../../services/foodService';
import UpdateFoodModal from '../../components/UpdateFoodModal/UpdateFoodModal';
import '../../styles/MyFoods.css';

const MyFoods = () => {
  const { currentUser } = useAuth();
  const { data: foods, refetch, isFetching } = useMyFoods(currentUser.email);
  const [selectedFood, setSelectedFood] = useState(null);

  const handleUpdateSuccess = () => {
    refetch(); 
    setSelectedFood(null); 
  };

  return (
    <div className="my-foods-page">
      <h1>My Foods</h1>
      {isFetching && <p>Loading...</p>}
      <table className="my-foods-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods?.length === 0 ? (
            <tr>
              <td colSpan="4">No foods added by you.</td>
            </tr>
          ) : (
            foods?.map((food) => (
              <tr key={food._id}>
                <td>
                  <img src={food.image} alt={food.name} />
                </td>
                <td>{food.name}</td>
                <td>${typeof food.price === 'number' ? food.price.toFixed(2) : food.price}</td>
                <td>
                  <button onClick={() => setSelectedFood(food)}>Update</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {selectedFood && (
        <UpdateFoodModal food={selectedFood} onSuccess={handleUpdateSuccess} onClose={() => setSelectedFood(null)} />
      )}
    </div>
  );
};

export default MyFoods;