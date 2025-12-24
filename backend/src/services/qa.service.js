import crypto from 'crypto'
import { pineconeIndex } from '../lib/pinecone.js'
import { supabase } from '../lib/supabase.js'
import { embed } from '../services/embed.service.js'
import { cleanText } from '../utils/cleanText.js'

export async function createQAPair({
  question,
  answer,
  actorAdminId,
  sourceSuggestionId = null,
}) {
  const cleanQuestion = cleanText(question)
  const cleanAnswer = cleanText(answer)

  const vectorId = crypto.randomUUID()
  const embedding = await embed(cleanQuestion, 'search_document')

  // Pinecone first
  await pineconeIndex.upsert([
    {
      id: vectorId,
      values: embedding,
      metadata: {
        question: cleanQuestion,
        answer: cleanAnswer,
      },
    },
  ])

  // Insert QA pair
  const { data: qaRow, error } = await supabase
    .from('qa_pairs')
    .insert({
      question: cleanQuestion,
      answer: cleanAnswer,
      vector_id: vectorId,
    })
    .select('id')
    .single()

  if (error) throw error

  // Log creation
  await supabase.from('qa_pair_logs').insert({
    qa_pair_id: qaRow.id,
    actor_admin_id: actorAdminId,
    action_type: 'create',
    new_question: cleanQuestion,
    new_answer: cleanAnswer,
    source_suggestion_id: sourceSuggestionId,
  })

  return {
    qaPairId: qaRow.id,
    vectorId,
  }
}
