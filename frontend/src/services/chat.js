import axios from 'axios'
const baseUrl = '/api/chat'

const askChatbot = async (message) => {
  const response = await axios.post(baseUrl, message)
  return response.data
}

export default { askChatbot }
