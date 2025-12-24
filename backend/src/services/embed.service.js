import { cohere } from '../lib/cohere.js'

export const embed = async (text, inputType) => {
  const embedRes = await cohere.v2.embed({
    texts: [text],
    model: 'embed-english-v3.0',
    inputType,
    embeddingTypes: ['float'],
  })

  const embedding = embedRes.embeddings.float[0]

  return embedding
}
