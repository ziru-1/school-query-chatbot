import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
dotenv.config();

const client = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

export const pineconeIndex = client.index(process.env.PINECONE_INDEX_NAME);
