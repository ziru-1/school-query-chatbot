import express from 'express'
import { cohere } from '../lib/cohere.js'
import { pineconeIndex } from '../lib/pinecone.js'
import { supabase } from '../lib/supabase.js'
import { cleanText } from '../utils/cleanText.js'
import { embed } from '../services/embed.service.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const rawMessage = req.body.message

    if (!rawMessage) {
      return res.status(400).json({ error: 'No message provided' })
    }

    const message = cleanText(rawMessage)

    // 1. Create embedding using Cohere v2
    const embedding = await embed(message, 'search_query')

    // 2. Query Pinecone with more results for better matching
    const queryRes = await pineconeIndex.query({
      vector: embedding,
      topK: 5,
      includeMetadata: true,
    })

    const match = queryRes.matches?.[0] || null
    const topMatches = queryRes.matches || []

    let question = null
    let answer = null
    let confidence = 0

    if (match) {
      confidence = match.score
      question = match.metadata?.question || null
      answer = match.metadata?.answer || null
    }

    const highThreshold = 0.55 // Direct answer threshold
    const lowThreshold = 0.35 // Suggestion threshold

    let finalAnswer
    let suggestions = []

    if (confidence >= highThreshold && answer) {
      // High confidence: Return rewritten answer
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
    } else if (confidence >= lowThreshold && confidence < highThreshold) {
      // Medium confidence: Suggest the closest match
      finalAnswer = "I'm not entirely sure about that. Did you mean:"
      suggestions = [question]
    } else {
      // Low confidence: Find and suggest related questions
      const relatedQuestions = topMatches
        .filter((m) => m.score >= lowThreshold)
        .slice(0, 3)
        .map((m) => m.metadata?.question)
        .filter(Boolean)

      if (relatedQuestions.length > 0) {
        finalAnswer =
          "I couldn't find an exact match. Here are some related questions I can answer:"
        suggestions = relatedQuestions
      } else {
        finalAnswer =
          "I'm not sure about that yet. Please try rephrasing your question or ask something more specific."
      }
    }

    // Store logs
    await supabase.from('chat_logs').insert({
      user_query: message,
      matched_question: question,
      matched_answer: answer,
      confidence,
      response: finalAnswer,
      suggestions: suggestions.length > 0 ? suggestions : null,
    })

    res.json({
      answer: finalAnswer,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
      confidence, // Optional: for debugging
    })
  } catch (err) {
    console.error(err)

    if (err.statusCode === 429 || err.statusText === 'Too Many Requests') {
      return res.status(429).json({
        error:
          err.body?.message ||
          'Too many requests, please wait and try again later',
      })
    }

    if (err.statusCode === 402) {
      return res.status(402).json({
        error: err.body?.message || 'Monthly limit reached',
      })
    }

    return res.status(500).json({ error: err.message || 'Server error' })
  }
})

export default router
