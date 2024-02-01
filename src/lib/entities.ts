export type TLoginResponse = {
  data: {
    username: string;
    role_id: number;
    access_token: string;
    refresh_token: string;
  };
  message: string;
};

export type TNewsItems = {
  id: number;
  user_id: number;
  category: string;
  images: string;
  title: string;
  description: string;
  created_at: Date | string;
};

export type TGetNewsResponse = {
  data: TNewsItems[];
  message: string;
  pagination: {
    total_data: number;
    current_page: number;
    next_page: number;
    previous_page: number;
    page_size: number;
    total_page: number;
  };
};

export type TGetNewsByIdResponses = {
  data: {
    id: number;
    user_id: number;
    category: string;
    images: string;
    title: string;
    description: string;
    created_at: string;
  };
  message: string;
};
