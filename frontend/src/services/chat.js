import axios from 'axios'
const baseUrl = '/api/chat'

const askChatbot = async (message) => {
  try {
    const response = await axios.post(baseUrl, message)
    return response.data
  } catch (err) {
    const message =
      err.response?.data?.error || err.message || 'Something went wrong'
    throw new Error(message)
  }
}

export default { askChatbot }
