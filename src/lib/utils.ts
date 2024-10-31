import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  getCookie,
  setCookie,
  CookieValueTypes
} from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

interface GetCookieOptions {
  req?: NextApiRequest;
  res?: NextApiResponse;
}
interface SetSecureCookieOptions extends GetCookieOptions {}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserId = (options?: GetCookieOptions): string | null => {
  const userId = getCookie('userId', options);
  return typeof userId === 'string' ? userId : null;
};

export const getToken = (options?: GetCookieOptions): string | undefined => {
  const token = getCookie('jwt', options);
  return typeof token === 'string' ? token : undefined;
};


export const setSecureCookie = (
  name: string, 
  value: CookieValueTypes, 
  days: number,
  options?: SetSecureCookieOptions
) => {
  const maxAge = days * 24 * 60 * 60;
  
  setCookie(name, value, {
    ...options,
    maxAge,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    //httpOnly: true, // Empêche l'accès au cookie via JavaScript côté client
  });
};