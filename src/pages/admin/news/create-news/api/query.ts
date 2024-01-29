import { useQuery } from "@tanstack/react-query";
import { getNews } from "./api";

export const useGetNews = (params?: unknown) => {
  return useQuery({
    queryKey: ["get-news"],
    queryFn: async () => await getNews(params),
  });
};
