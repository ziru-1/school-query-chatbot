import express from 'express';
import { verifyAdmin } from '../middleware/auth.js';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Get all QAs
router.get('/', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase.from('qa_pairs').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Create new QA
router.post('/', verifyAdmin, async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) return res.status(400).json({ error: 'Missing fields' });

  const { data, error } = await supabase.from('qa_pairs').insert([{ question, answer }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// Update QA
router.put('/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  const { data, error } = await supabase.from('qa_pairs').update({ question, answer }).eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// Delete QA
router.delete('/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase.from('qa_pairs').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Deleted successfully' });
});

export default router;
