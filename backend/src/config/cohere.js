import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const cohereInstance = axios.create({
  baseURL: 'https://api.cohere.ai',
  headers: {
    Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});
