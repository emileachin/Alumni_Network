import axios from 'axios'
const baseUrl = '/api/alumni'

let token = null

// This service fetches all alumni data from the backend API
const getAll = async () => {
  try {
   // Configure the request with the token
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.get(baseUrl, config)
    return response.data
  } catch (error) {
    console.error('Error fetching alumni:', error)
    throw error
  }
}

const setToken = (newToken) => {
    // Set the Authorization header for all axios requests
    token = `Bearer ${newToken}`
}

export default { getAll, setToken }