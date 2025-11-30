import express from 'express'
import { cohere } from '../config/cohere.js'
import { pineconeIndex } from '../config/pinecone.js'
import { supabase } from '../config/supabase.js'
import { cleanText } from '../utils/cleanText.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const rawMessage = req.body.message

    if (!rawMessage) {
      return res.status(400).json({ error: 'No message provided' })
    }

    const message = cleanText(rawMessage)

    // 1. Create embedding using Cohere v2
    const embedRes = await cohere.v2.embed({
      texts: [message],
      model: 'embed-english-v3.0',
      inputType: 'search_query',
      embeddingTypes: ['float'],
    })

    const embedding = embedRes.embeddings.float[0]

    // 2. Query Pinecone
    const queryRes = await pineconeIndex.query({
      vector: embedding,
      topK: 1,
      includeMetadata: true,
    })

    const match = queryRes.matches?.[0] || null

    let question = null
    let answer = null
    let confidence = 0

    if (match) {
      confidence = match.score
      question = match.metadata?.question || null
      answer = match.metadata?.answer || null
    }

    const threshold = 0.55

    let finalAnswer
    if (confidence >= threshold && answer) {
      // 3. Make the answer more natural but without adding new facts
      const gen = await cohere.chat({
        message: `
You are a strict text-rewriter.

Context (DO NOT add to or change this):
Question: "${question}"

Your task is to rewrite ONLY the answer text. You may use the question ONLY to understand meaning, not to add or infer new information.

Rules:
1. Rewrite the answer so it reads smoothly and naturally.
2. You may ONLY rearrange, reword, simplify, or normalize capitalization and punctuation.
3. You may NOT add any new information, details, or wording not present in the original answer.
4. Do NOT add friendliness, explanations, or commentary.
5. Output ONLY the rewritten answer text. No quotes, no markdown, no extra sentences.
6. If rewriting requires adding information, return the answer unchanged.

Answer to rewrite: "${answer}"
  `,
      })

      finalAnswer = gen.text
    } else {
      finalAnswer = "I'm not sure about that yet."
    }

    // 3. Store logs
    await supabase.from('chat_logs').insert({
      user_query: message,
      matched_question: question,
      matched_answer: answer,
      confidence,
      response: finalAnswer,
    })

    res.json({
      answer: finalAnswer,
      confidence,
      foundMatch: confidence >= threshold,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
