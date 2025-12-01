import express from 'express';
import cors from 'cors';

import adminRoutes from './routes/admin.js';
import qaRoutes from './routes/qa.js';
import chatRoutes from './routes/chat.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/qa', qaRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('RAG Chatbot Backend Running');
});

export default app;
