import { CohereClient } from 'cohere-ai';
import dotenv from 'dotenv';
dotenv.config();

export const cohere = new CohereClient({
  apiKey: process.env.COHERE_API_KEY
});
