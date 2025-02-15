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

export const useFoods = (filters = {}) => {
  return useQuery({
    queryKey: ['foods', filters],
    queryFn: () => getAllFoods(filters),
    keepPreviousData: true,
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