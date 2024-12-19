import { Auth } from '~types';

const TOKEN_KEY = 'token';
const EMAIL_KEY = 'email';

export const setLogin = ({ token, email }: Auth) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EMAIL_KEY, email);
};

export const setLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
};

export const isTokenExpired = (): boolean => {
  return !localStorage.getItem(TOKEN_KEY);
};
