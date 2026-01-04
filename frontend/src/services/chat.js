import axios from 'axios'
const baseUrl = '/api/chat'

const askChatbot = async (message) => {
  try {
    const response = await axios.post(baseUrl, message)
    return response.data
  } catch (err) {
    let message
    const status = err.response?.status

    if (status === 402) {
      message = 'Embed model monthly limit has been reached'
    } else if (status === 429) {
      message = 'Too many requests. Please try again later.'
    } else {
      message =
        err.response?.data?.error || err.message || 'Something went wrong'
    }

    throw new Error(message)
  }
}

export default { askChatbot }
