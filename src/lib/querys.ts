import axios from "axios";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  TCreateNewsResponse,
  TGetCategoriesResponse,
  TGetNewsResponse,
  TLoginResponse,
  TRemoveNewsResponses,
} from ".";

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

export const useGetCategories = (): UseQueryResult<TGetCategoriesResponse> => {
  return useQuery({
    queryKey: ["get-categories"],
    queryFn: async () => {
      const { data } = await api.get("/news/category");

      return data;
    },
  });
};

export const useLogin = (): UseMutationResult<TLoginResponse> => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: unknown) => {
      const { data } = await api.post("/auth/login", payload);

      return data;
    },
  });
};

export const useCreateNews = (): UseMutationResult<TCreateNewsResponse> => {
  return useMutation({
    mutationKey: ["create-news"],
    mutationFn: async (payload: unknown) => {
      const { data } = await api.post("/news", payload);

      return data;
    },
  });
};

export const useGetNews = (
  params?: unknown,
): UseQueryResult<TGetNewsResponse> => {
  return useQuery({
    queryKey: ["get-news"],
    queryFn: async () => {
      const { data } = await api.get("/news", { params: params });

      return data;
    },
  });
};

export const useRemoveNews = (): UseMutationResult<
  TRemoveNewsResponses,
  Error,
  string | number | undefined,
  unknown
> => {
  return useMutation<
    TRemoveNewsResponses,
    Error,
    string | number | undefined,
    unknown
  >({
    mutationKey: ["remove-news"],
    mutationFn: async (params?: string | number) => {
      const { data } = await api.delete(`/news/${params}`);

      return data;
    },
  });
};