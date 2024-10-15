import { jwtDecode } from 'jwt-decode';
import { config } from './config';

interface MyToken {
  names: string;
  email: string;
  role: string;
}

const TOKEN_NAME = `${config.APP_NAME}-token`;
export interface DecodedToken {
  id: string;
  email: string;
  role: string;
  names: string;
  telephone: string;
}

export const storage = {
  getToken: () => localStorage.getItem(TOKEN_NAME),
  setToken: (token: string) => localStorage.setItem(TOKEN_NAME, token),
  removeToken: () => localStorage.removeItem(TOKEN_NAME),
};
const token = storage.getToken();
export const userPayload = token ? jwtDecode<MyToken>(token as string) : null;
export function decodeToken() {
  const decodedToken: DecodedToken = jwtDecode(storage.getToken() || '');
  return decodedToken;
}
