import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  exp: number;
  iat: number;
  role_id: string;
  user_id: string;
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem("refresh_token", token);
};

export const removeToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const getUserRole = () => {
  const token = getAccessToken();
  if (!token) {
    return null;
  }
  const decoded = jwtDecode<TokenPayload>(token);
  return decoded.role_id;
};
