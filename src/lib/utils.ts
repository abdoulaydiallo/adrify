import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const setSecureCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = `${name}=${value}${expires}; path=/; secure; samesite=strict`;
};
export const getUserId = (): string | null => {
   return document.cookie.split('; ').find(row => row.startsWith('userId='))?.split('=')[1] || null;
};

export const getToken = (): string | undefined => {
  return document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1];
};