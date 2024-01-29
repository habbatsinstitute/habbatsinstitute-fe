import { api } from "@/services";

export const getNews = async (params: unknown) => {
  const { data } = await api.get("/newss", { params: params });

  return data;
};
