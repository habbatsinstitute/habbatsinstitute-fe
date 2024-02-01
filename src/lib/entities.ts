export type TUserMe = {
  id: number;
  username: string;
  role_id: number;
  expiry_date: string;
};

export type TGetUserMeResponse = {
  data: TUserMe;
  message: string;
};

export type TCategory = {
  id: number;
  name: string;
};

export type TGetCategoriesResponse = {
  data: TCategory[];
  message: string;
};

export type TLoginResponse = {
  data: {
    username: string;
    role_id: number;
    access_token: string;
    refresh_token: string;
  };
  message: string;
};

export type TCourseItems = {
  id: number;
  user_id: number;
  media_file: string;
  title: string;
  description: string;
  author: string;
  created_at: Date | string;
};

export type TCreateCourseResponse = {
  data: TCourseItems;
  message: string;
};

export type TGetCourseResponse = {
  data: TCourseItems[];
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

export type TCreateNewsResponse = {
  data: [
    {
      id: number;
      user_id: number;
      category: string;
      images: string;
      title: string;
      description: string;
      created_at: Date | string;
    },
  ];
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

export type TRemoveNewsResponses = {
  message: string;
};
