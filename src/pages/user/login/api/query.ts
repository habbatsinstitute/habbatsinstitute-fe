import { useMutation } from "@tanstack/react-query";
import { login } from "./api";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: unknown) => login(payload),
  });
};
