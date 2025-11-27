import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const pineconeInstance = axios.create({
  baseURL: process.env.PINECONE_INDEX_URL,
  headers: {
    'Api-Key': process.env.PINECONE_API_KEY,
    'Content-Type': 'application/json',
  },
});
