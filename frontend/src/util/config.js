
import jwt from 'jsonwebtoken';

export const API_URL = "http://localhost:5000"

export function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, 'your-secret-key'); 
    return decoded;
  } catch (error) {
    throw error;
  }
}
