import axios from "axios"
const baseUrl = "/api/edit"

let token = null 

const getAlumni = async (username) => {
    try {
        const config = {
            headers: { Authorization: token }
        }
        const response = await axios.get(`${baseUrl}/${username}`, config)
        return response.data
    }
    catch (error) {
        console.error("Error fetching alumni by ID:", error)
        throw error
    }
}

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const editAlumni = async (username, alumniData) => {
    try {
        const config = {
            headers: { Authorization: token }
        }

        console.log('Making PUT request:', {
        url: `${baseUrl}/${username}`,
        alumniData,
        headers: config.headers
        })

        const response = await axios.put(`${baseUrl}/${username}`, alumniData, config)
        return response.data
    }
    catch (error) {
        console.error("Error updating alumni:", error)
        throw error
    }
}

export default {
    editAlumni, getAlumni, setToken
}