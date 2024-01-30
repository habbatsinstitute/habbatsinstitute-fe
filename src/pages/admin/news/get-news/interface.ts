interface NewsItem {
  id: number;
  user_id: number;
  category: string;
  images: string;
  title: string;
  description: string;
  created_at: string;
}

export interface NewsData {
  data: NewsItem[];
  message: string;
  pagination: {
    total_data: number;
    current_page: number;
    next_page: number;
    previous_page: number;
    page_size: number;
    total_page: number;
  };
}
