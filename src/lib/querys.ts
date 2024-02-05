import axios from "axios";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  TCreateCourseResponse,
  TCreateNewsResponse,
  TCreateUserResponse,
  TGetAllUsersResponse,
  TGetCategoriesResponse,
  TGetCourseByIdResponse,
  TGetCourseResponse,
  TGetNewsResponse,
  TGetUserByIdResponse,
  TGetUserMeResponse,
  TLoginResponse,
  TRemoveCourseResponse,
  TRemoveNewsResponses,
  TRemoveUserResponse,
  TUpdateCourseResponse,
} from ".";

export const api = axios.create({
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

export const useGetUserMe = (): UseQueryResult<TGetUserMeResponse> => {
  return useQuery({
    queryKey: ["get-user-me"],
    queryFn: async () => {
      const { data } = await api.get("/users/me");

      return data;
    },
  });
};

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

export const useCreateCourse = (): UseMutationResult<TCreateCourseResponse> => {
  return useMutation({
    mutationKey: ["create-course"],
    mutationFn: async (payload: unknown) => {
      const { data } = await api.post("/courses", payload);

      return data;
    },
  });
};

export const useGetCourse = (
  params?: unknown,
): UseQueryResult<TGetCourseResponse> => {
  return useQuery({
    queryKey: ["get-course"],
    queryFn: async () => {
      const { data } = await api.get("/courses", { params: params });

      return data;
    },
  });
};

export const useGetCourseById = (
  params?: unknown,
): UseQueryResult<TGetCourseByIdResponse> => {
  return useQuery({
    queryKey: ["get-course-by-id"],
    queryFn: async () => {
      const { data } = await api.get(`/courses/${params}`);

      return data;
    },
  });
};

export const useUpdateCourse = (
  params?: unknown,
): UseMutationResult<TUpdateCourseResponse> => {
  return useMutation({
    mutationKey: ["update-course"],
    mutationFn: async (payload: unknown) => {
      const { data } = await api.put(`/courses/${params}`, payload);

      return data;
    },
  });
};

export const useRemoveCourse = (): UseMutationResult<
  TRemoveCourseResponse,
  Error,
  string | number | undefined,
  unknown
> => {
  return useMutation<
    TRemoveCourseResponse,
    Error,
    string | number | undefined,
    unknown
  >({
    mutationKey: ["remove-course"],
    mutationFn: async (params?: string | number) => {
      const { data } = await api.delete(`/courses/${params}`);

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

export const useCreateUser = (): UseMutationResult<TCreateUserResponse> => {
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: async (payload: unknown) => {
      const { data } = await api.post("/auth/register", payload);

      return data;
    },
  });
};

export const useGetAllUsers = (
  params?: unknown,
): UseQueryResult<TGetAllUsersResponse> => {
  return useQuery({
    queryKey: ["get-all-users"],
    queryFn: async () => {
      const { data } = await api.get("/users", { params: params });

      return data;
    },
  });
};

export const useGetUserById = (
  params?: unknown,
): UseQueryResult<TGetUserByIdResponse> => {
  return useQuery({
    queryKey: ["get-user-by-id"],
    queryFn: async () => {
      const { data } = await api.get(`/users/${params}`);

      return data;
    },
  });
};

export const useRemoveUser = (): UseMutationResult<
  TRemoveUserResponse,
  Error,
  string | number | undefined,
  unknown
> => {
  return useMutation<
    TRemoveUserResponse,
    Error,
    string | number | undefined,
    unknown
  >({
    mutationKey: ["remove-user"],
    mutationFn: async (params?: string | number) => {
      const { data } = await api.delete(`/users/${params}`);

      return data;
    },
  });
};
