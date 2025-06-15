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

const editAlumni = async (alumni) => {
    try {
        const response = await axios.put(`${baseUrl}/${alumni.username}`, alumni)
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