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

    const MAX_CHARS = 200

    if (message.length > MAX_CHARS) {
      return res.status(400).json({
        error: 'Message is too long.',
      })
    }

    // 1. Fetch thresholds from Supabase
    const { data: settings, error: settingsError } = await supabase
      .from('chatbot_settings')
      .select('key, value')

    if (settingsError) throw new Error('Failed to load chatbot settings')

    const thresholds = Object.fromEntries(settings.map((s) => [s.key, s.value]))

    const highThreshold = thresholds.high_threshold
    const mediumThreshold = thresholds.medium_threshold ?? 0.35
    const lowThreshold = thresholds.low_threshold ?? 0.25

    // 2. Create embedding using Cohere v2
    const embedding = await embed(message, 'search_query')

    // 3. Query Pinecone with more results for better matching
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
    } else {
      return res.status(404).json({
        error: 'Knowledge base is currently empty. Please try again later.',
      })
    }

    let finalAnswer
    let suggestions = []

    if (confidence >= highThreshold && answer) {
      const gen = await cohere.chat({
        message: `
You are a helpful school information assistant.

You are given a user question and a reference context retrieved from a knowledge base. Use the context to answer the user's question naturally and concisely.

User Question: "${message}"

Reference Context:
Q: "${question}"
A: "${answer}"

Rules:
1. If the reference context is relevant to the user's question, use it to form a clear and natural response.
2. If the reference context does NOT actually address the user's question, respond with: "I'm sorry, I don't have information about that."
3. Do NOT make up or infer information beyond what is in the reference context.
4. Do NOT mention that you are using a reference or context.
5. Output ONLY the response. No quotes, no markdown, no extra commentary.
    `,
      })

      finalAnswer = gen.text
    } else if (confidence >= mediumThreshold && confidence < highThreshold) {
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
      confidence,
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
