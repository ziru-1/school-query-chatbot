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
      err.response?.data?.error || err.message || 'Unable to fetch QA data'
    throw new Error(message)
  }
}

export const createQA = async (access_token, qaData) => {
  try {
    const response = await axios.post(baseUrl, qaData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
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
        err.response?.data?.error || err.message || 'Unable to create QA'
    }

    throw new Error(message)
  }
}

export const updateQA = async (access_token, qaPairId, qaData) => {
  try {
    const response = await axios.put(`${baseUrl}/${qaPairId}`, qaData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
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
        err.response?.data?.error || err.message || 'Unable to update QA'
    }

    throw new Error(message)
  }
}

export const deleteQA = async (access_token, qaPairId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${qaPairId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return response.data
  } catch (err) {
    const message =
      err.response?.data?.error || err.message || 'Unable to delete QA'
    throw new Error(message)
  }
}
