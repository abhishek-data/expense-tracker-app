
export const API_URL = "http://localhost:5000"

export function decodeToken(token) {
  const parts = token.split('.');
  const payload = parts[1];
  return JSON.parse(atob(payload));
}

