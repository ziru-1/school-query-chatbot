import express from 'express'
import { cohere } from '../config/cohere.js'
import { pineconeIndex } from '../config/pinecone.js'
import { supabase } from '../config/supabase.js'
import { cleanText } from '../utils/cleanText.js'

const router = express.Router()

// Create or update a QA pair
router.post('/', async (req, res) => {
  try {
    const rawQuestion = req.body.question
    const rawAnswer = req.body.answer

    if (!rawQuestion || !rawAnswer) {
      return res.status(400).json({ error: 'Question and answer are required' })
    }

    const question = cleanText(rawQuestion)
    const answer = cleanText(rawAnswer)

    // 1. Embed with Cohere v2
    const embedRes = await cohere.v2.embed({
      texts: [question],
      model: 'embed-english-light-v3.0',
      inputType: 'search_document',
      embeddingTypes: ['float'],
    })

    const embedding = embedRes.embeddings.float[0]

    // 2. Create vector ID
    const vectorId = crypto.randomUUID()

    // 3. Run Pinecone + Supabase in parallel
    const pineconePromise = pineconeIndex.upsert([
      {
        id: vectorId,
        values: embedding,
        metadata: { question, answer },
      },
    ])

    const supabasePromise = supabase
      .from('qa_pairs')
      .insert({ question, answer, vector_id: vectorId })

    const [pineconeResult, supabaseResult] = await Promise.all([
      pineconePromise,
      supabasePromise,
    ])

    if (supabaseResult.error) {
      return res.status(500).json({ error: supabaseResult.error.message })
    }

    res.json({
      success: true,
      message: 'QA added',
      vector_id: vectorId,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Update an existing QA pair
router.put('/:id', async (req, res) => {
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
    const embedRes = await cohere.v2.embed({
      texts: [question],
      model: 'embed-english-light-v3.0',
      inputType: 'search_document',
      embeddingTypes: ['float'],
    })

    const embedding = embedRes.embeddings.float[0]

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
router.get('/', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
