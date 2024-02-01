import { atom } from "recoil";
import { TGetNewsResponse } from ".";

export const newsState = atom({
  key: "news-state",
  default: {
    data: [],
    message: "",
    pagination: {
      total_data: 0,
      current_page: 0,
      next_page: 0,
      previous_page: 0,
      page_size: 0,
      total_page: 0,
    },
  } as TGetNewsResponse,
});
