import { api } from "@/services";

export const login = async (login: unknown) => {
  const { data } = await api.post("/auth/login", login);

  return data;
};
