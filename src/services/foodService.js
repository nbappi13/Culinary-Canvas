import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const getAllFoods = async (filters = {}) => {
  try {
    const response = await axios.get('/api/foods', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching foods', error.response?.data || error.message);
    return [];
  }
};

export const getFoodById = async (id) => {
  try {
    const response = await axios.get(`/api/foods/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching food', error.response?.data || error.message);
    return null;
  }
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

export const useAddFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newFood) => {
      const response = await axios.post('/api/foods', newFood);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['foods']);
    },
  });
};