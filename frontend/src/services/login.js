import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    // post to login endpoint
    const response = await axios.post(baseUrl, credentials)

    // return the user data
    return response.data
}

export default { login }