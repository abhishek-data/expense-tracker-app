export const API_URL = import.meta.env.VITE_REACT_APP_URL
export function decodeToken(token) {
  const parts = token.split('.');
  const payload = parts[1];
  return JSON.parse(atob(payload));
}

