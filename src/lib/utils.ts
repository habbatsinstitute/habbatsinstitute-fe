import { type ClassValue, clsx } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const formatDateResponse = (createdAt: string | Date): string => {
  const date = new Date(createdAt);

  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

type TokenPayload = {
  exp: number;
  iat: number;
  role_id: number;
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
