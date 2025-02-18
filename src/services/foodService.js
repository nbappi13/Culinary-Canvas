import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:5000/api';


export const getAllFoods = async (filters = {}) => {
  const response = await axios.get(`${API_BASE_URL}/foods`, { params: filters });
  return response.data;
};


export const getFoodById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/foods/${id}`);
  return response.data;
};


export const getTopSellingFoods = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/top-foods`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top-selling foods:', error.message);
    throw error;
  }
};


export const getMyFoods = async (email) => {
  const response = await axios.get(`${API_BASE_URL}/my-foods`, {
    headers: { email },
  });
  return response.data;
};


export const addFood = async (foodData) => {
  const response = await axios.post(`${API_BASE_URL}/add-food`, foodData);
  return response.data;
};

export const updateFood = async (id, foodData, email) => {
  if (!id || id.length !== 24) {
    throw new Error('Invalid food ID');
  }

  const response = await axios.put(`${API_BASE_URL}/update-food/${id}`, foodData, {
    headers: { email },
  });
  return response.data;
};


export const useFoods = (filters = {}) => {
  return useQuery({
    queryKey: ['foods', filters],
    queryFn: () => getAllFoods(filters),
    keepPreviousData: true,
  });
};

export const useFood = (id) => {
  return useQuery({
    queryKey: ['food', id],
    queryFn: () => getFoodById(id),
    enabled: !!id,
  });
};

export const useMyFoods = (email) => {
  return useQuery({
    queryKey: ['my-foods', email],
    queryFn: () => getMyFoods(email),
    enabled: !!email,
  });
};

export const useAddFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newFood) => addFood(newFood),
    onSuccess: () => {
      queryClient.invalidateQueries(['foods']);
      queryClient.invalidateQueries(['my-foods']);
      queryClient.invalidateQueries(['top-foods']); 
    },
  });
};

export const useUpdateFood = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, foodData, email }) => updateFood(id, foodData, email),
    onSuccess: () => {
      queryClient.invalidateQueries(['my-foods']);
      queryClient.invalidateQueries(['foods']);
      queryClient.invalidateQueries(['top-foods']); 
    },
  });
};
