// Updated foodService.jsx
import axios from 'axios';

export const getAllFoods = async () => {
  try {
    const response = await axios.get('/api/foods'); 
    console.log('API response:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching foods', error.response?.data || error.message);
    return [];
  }
};