import { api } from "@/services";

export const getNews = async (params: unknown) => {
  const { data } = await api.get("/news", { params: params });

  return data;
};
