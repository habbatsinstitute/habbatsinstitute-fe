import axios, { AxiosError } from "axios";
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
  TGetNewsByIdResponses,
  TGetNewsResponse,
  TGetUserByIdResponse,
  TGetUserMeResponse,
  TLoginResponse,
  TRemoveCourseResponse,
  TRemoveNewsResponses,
  TRemoveUserResponse,
  TSendQuestion,
  TUpdateCourseResponse,
  TUpdateNewsResponse,
  TUpdateUserResponse,
  removeToken,
} from ".";

export const api = axios.create({
  baseURL: "https://habbats-be.vercel.app/api/v1",
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const responseData = error.response.data;
      if (
        responseData &&
        responseData.status === false &&
        responseData.message ===
          "token is not valid - token signature is invalid: signature is invalid"
      ) {
        removeToken();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
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

export const useLogin = (): UseMutationResult<
  TLoginResponse,
  AxiosError<{ message: string }>
> => {
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

export const useGetNewsById = (
  params?: unknown,
): UseQueryResult<TGetNewsByIdResponses> => {
  return useQuery({
    queryKey: ["get-news-by-id"],
    queryFn: async () => {
      const { data } = await api.get(`/news/${params}`);

      return data;
    },
  });
};

export const useUpdateNews = (
  params?: unknown,
): UseMutationResult<TUpdateNewsResponse> => {
  return useMutation({
    mutationKey: ["update-news"],
    mutationFn: async (payload: unknown) => {
      const { data } = await api.patch(`/news/${params}`, payload);

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

export const useUpdateUser = (
  params?: unknown,
): UseMutationResult<TUpdateUserResponse> => {
  return useMutation({
    mutationKey: ["update-user"],
    mutationFn: async (payload: unknown) => {
      const { data } = await api.put(`/users/update/${params}`, payload);

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

export const useSendQuestion = (): UseMutationResult<TSendQuestion> => {
  return useMutation({
    mutationKey: ["send-question"],
    mutationFn: async (payload: unknown) => {
      const { data } = await api.post("/chatbots", payload);

      return data;
    },
  });
};
