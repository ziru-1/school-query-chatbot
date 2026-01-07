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

export const createAdmin = async () => {}
export const updateAdmin = async () => {}
export const resetAdminPassword = async () => {}
export const deleteAdmin = async () => {}
