import axios from "axios";
const baseUrl = "/api/matches"

let token = null

const getMatches = async () => {
    try {
   // Configure the request with the token
    const config = {
      headers: { Authorization: token }
    }

    // Make the GET request to fetch matches
    const response = await axios.get(baseUrl, config)
    return response.data
  } catch (error) {
    console.error('Error fetching matches:', error)
    throw error
  }
}

const setToken = (newToken) => {
    // Set the Authorization header for all axios requests
    token = `Bearer ${newToken}`
}

export default { getMatches, setToken };