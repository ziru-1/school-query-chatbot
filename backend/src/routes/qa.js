import express from 'express'
import { pineconeIndex } from '../lib/pinecone.js'
import { supabase } from '../lib/supabase.js'
import { cleanText } from '../utils/cleanText.js'
import { embed } from '../services/embed.service.js'
import { verifyAdmin } from '../middleware/auth.js'
import { createQAPair } from '../services/qa.service.js'

const router = express.Router()

// Create or update a QA pair
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { question, answer, sourceSuggestionId = null } = req.body
    const admin = req.admin

    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required' })
    }

    const result = await createQAPair({
      question,
      answer,
      actorAdminId: admin.auth_user_id,
      sourceSuggestionId,
    })

    res.json({
      success: true,
      message: 'QA added',
      qa_pair_id: result.qaPairId,
      vector_id: result.vectorId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err.message || 'Server error',
    })
  }
})

// Update an existing QA pair
router.put('/:qaPairId', verifyAdmin, async (req, res) => {
  try {
    const { qaPairId } = req.params
    const { question: rawQuestion, answer: rawAnswer } = req.body
    const admin = req.admin

    if (!rawQuestion || !rawAnswer) {
      return res.status(400).json({ error: 'Question and answer are required' })
    }

    const question = cleanText(rawQuestion)
    const answer = cleanText(rawAnswer)

    // 1. Fetch existing QA (needed for vector_id + logs)
    const { data: existing, error: fetchError } = await supabase
      .from('qa_pairs')
      .select('id, vector_id, question, answer')
      .eq('id', qaPairId)
      .single()

    if (fetchError || !existing) {
      return res.status(404).json({ error: 'QA pair not found' })
    }

    const {
      vector_id: vectorId,
      question: oldQuestion,
      answer: oldAnswer,
    } = existing

    // 2. Embed new question
    const embedding = await embed(question, 'search_document')

    // 3. Update Pinecone FIRST
    await pineconeIndex.upsert([
      {
        id: vectorId,
        values: embedding,
        metadata: { question, answer },
      },
    ])

    // 4. Update Supabase
    const { error: updateError } = await supabase
      .from('qa_pairs')
      .update({ question, answer })
      .eq('id', qaPairId)

    if (updateError) {
      return res.status(500).json({ error: updateError.message })
    }

    // 5. Insert log (you can extract this later)
    const { error: logError } = await supabase.from('qa_pair_logs').insert({
      qa_pair_id: qaPairId,
      actor_admin_id: admin.auth_user_id,
      action_type: 'update',
      old_question: oldQuestion,
      new_question: question,
      old_answer: oldAnswer,
      new_answer: answer,
    })

    if (logError) {
      return res.status(500).json({ error: logError.message })
    }

    res.json({
      success: true,
      message: 'QA pair updated',
      qa_pair_id: qaPairId,
      vector_id: vectorId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Fetch all QA pairs
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase.from('qa_pairs').select('*')

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Delete a QA pair
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const vectorId = req.params.id

    // Delete vector + row in parallel
    const pineconePromise = pineconeIndex.deleteMany([vectorId])
    const supabasePromise = supabase
      .from('qa_pairs')
      .delete()
      .eq('vector_id', vectorId)

    await Promise.all([pineconePromise, supabasePromise])

    res.json({ success: true, message: 'QA pair deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
