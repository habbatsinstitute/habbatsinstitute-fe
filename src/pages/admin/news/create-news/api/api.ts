import { api } from "@/services";

export const createNews = async (payload: unknown) => {
  const { data } = await api.post("/news", payload);

  return data;
};
