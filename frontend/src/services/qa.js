import axios from 'axios'
const baseUrl = '/api/qa'

export const getQA = async (access_token) => {
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return response.data
  } catch (err) {
    const message =
      err.response?.data?.error || err.message || 'Unable to fetch qa data'
    throw new Error(message)
  }
}
