import axios from 'axios'
const baseUrl = '/api/admin'

export const getAdmins = async (access_token) => {
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return response.data
  } catch (err) {
    const message =
      err.response?.data?.error ||
      err.message ||
      'Unable to fetch admin users data'
    throw new Error(message)
  }
}

export const createAdmin = async (access_token, adminData) => {
  try {
    const response = await axios.post(baseUrl, adminData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return response.data
  } catch (err) {
    const message =
      err.response?.data?.error || err.message || 'Unable to create admin user'
    throw new Error(message)
  }
}

export const updateAdmin = async (access_token, id, updates) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, updates, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return response.data
  } catch (err) {
    const message =
      err.response?.data?.error || err.message || 'Unable to update admin user'
    throw new Error(message)
  }
}

export const resetAdminPassword = async (access_token, id, newPassword) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/${id}/reset-password`,
      { newPassword },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )
    return response.data
  } catch (err) {
    const message =
      err.response?.data?.error ||
      err.message ||
      'Unable to reset admin password'
    throw new Error(message)
  }
}

export const deleteAdmin = async (access_token, id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    return response.data
  } catch (err) {
    const message =
      err.response?.data?.error || err.message || 'Unable to delete admin user'
    throw new Error(message)
  }
}
