import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: unknown) => {
      const { data } = await api.post("/auth/login", payload);

      return data;
    },
  });
};

export const useGetNews = (params?: unknown) => {
  return useQuery({
    queryKey: ["get-news"],
    queryFn: async () => {
      const { data } = await api.get("/news", { params: params });

      return data;
    },
  });
};

export const useCreateNews = () => {
  return useMutation({
    mutationKey: ["create-news"],
    mutationFn: async (payload: unknown) => {
      const { data } = await api.post("/news", payload);

      return data;
    },
  });
};
