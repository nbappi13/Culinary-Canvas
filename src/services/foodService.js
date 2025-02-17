import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:5000/api';


export const addFood = async (foodData) => {
  const response = await axios.post(`${API_BASE_URL}/add-food`, foodData);
  return response.data;
};


export const getAllFoods = async (filters = {}) => {
  const response = await axios.get(`${API_BASE_URL}/foods`, { params: filters });
  return response.data;
};


export const getFoodById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/foods/${id}`);
  return response.data;
};


export const getMyFoods = async (email) => {
  const response = await axios.get(`${API_BASE_URL}/my-foods`, {
    headers: { email },
  });
  return response.data;
};


export const updateFood = async (id, foodData, email) => {
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
    },
  });
};