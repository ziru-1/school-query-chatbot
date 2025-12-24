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
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const vectorId = req.params.id
    const rawQuestion = req.body.question
    const rawAnswer = req.body.answer

    if (!rawQuestion || !rawAnswer) {
      return res.status(400).json({ error: 'Question and answer are required' })
    }

    const question = cleanText(rawQuestion)
    const answer = cleanText(rawAnswer)

    // 1. Embed using Cohere v2
    const embedding = await embed(question, 'search_document')

    // 2. Pinecone + Supabase in parallel
    const pineconePromise = pineconeIndex.upsert([
      {
        id: vectorId,
        values: embedding,
        metadata: { question, answer },
      },
    ])

    const supabasePromise = supabase
      .from('qa_pairs')
      .update({ question, answer })
      .eq('vector_id', vectorId)

    const [, supabaseResult] = await Promise.all([
      pineconePromise,
      supabasePromise,
    ])

    if (supabaseResult.error) {
      return res.status(500).json({ error: supabaseResult.error.message })
    }

    res.json({
      success: true,
      message: 'QA pair updated',
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
