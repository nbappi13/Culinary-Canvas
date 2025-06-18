import axiosInstance from "../utils/axiosInstance"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL

// API functions for food operations
export const getAllFoods = async (filters = {}, page = 1, limit = 9) => {
  const response = await axiosInstance.get("/foods", {
    params: { ...filters, page, limit },
  })
  return response.data
}

export const getFoodById = async (id) => {
  const response = await axiosInstance.get(`/foods/${id}`)
  return response.data
}

export const getTopSellingFoods = async () => {
  try {
    const response = await axiosInstance.get("/top-foods")
    return response.data
  } catch (error) {
    console.error("Error fetching top-selling foods:", error.message)
    throw error
  }
}

export const getMyFoods = async (email) => {
  const response = await axiosInstance.get("/my-foods", {
    headers: { email },
  })
  return response.data
}

export const getMyOrders = async (email) => {
  const response = await axiosInstance.get("/my-orders", {
    headers: { email },
  })
  return response.data
}

export const deleteOrder = async (id, email) => {
  const response = await axiosInstance.delete(`/my-orders/${id}`, {
    headers: { email },
  })
  return response.data
}

export const addFood = async (foodData) => {
  const response = await axiosInstance.post("/add-food", foodData)
  return response.data
}

export const updateFood = async (id, foodData, email) => {
  if (!id || id.length !== 24) {
    throw new Error("Invalid food ID")
  }

  const response = await axiosInstance.put(`/update-food/${id}`, foodData, {
    headers: { email },
  })
  return response.data
}

// React Query hooks for data fetching and caching
export const useFoods = (filters = {}, page = 1) => {
  return useQuery({
    queryKey: ["foods", filters, page],
    queryFn: () => getAllFoods(filters, page),
    keepPreviousData: true,
  })
}

export const useFood = (id) => {
  return useQuery({
    queryKey: ["food", id],
    queryFn: () => getFoodById(id),
    enabled: !!id,
  })
}

export const useMyFoods = (email) => {
  return useQuery({
    queryKey: ["my-foods", email],
    queryFn: () => getMyFoods(email),
    enabled: !!email,
  })
}

export const useMyOrders = (email) => {
  return useQuery({
    queryKey: ["my-orders", email],
    queryFn: () => getMyOrders(email),
    enabled: !!email,
  })
}

// Mutation hooks for data modification
export const useAddFood = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newFood) => addFood(newFood),
    onSuccess: () => {
      // Refresh related data after adding food
      queryClient.invalidateQueries(["foods"])
      queryClient.invalidateQueries(["my-foods"])
      queryClient.invalidateQueries(["top-foods"])
    },
  })
}

export const useUpdateFood = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, foodData, email }) => updateFood(id, foodData, email),
    onSuccess: () => {
      // Refresh related data after updating food
      queryClient.invalidateQueries(["my-foods"])
      queryClient.invalidateQueries(["foods"])
      queryClient.invalidateQueries(["top-foods"])
    },
  })
}

export const useDeleteOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, email }) => deleteOrder(id, email),
    onSuccess: () => {
      // Refresh orders after deletion
      queryClient.invalidateQueries(["my-orders"])
    },
  })
}
