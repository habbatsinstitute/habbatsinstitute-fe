import { useMutation } from "@tanstack/react-query";
import { createNews } from "./api";

export const useCreateNews = () => {
  return useMutation({
    mutationKey: ["create-news"],
    mutationFn: async (payload: unknown) => await createNews(payload),
  });
};
