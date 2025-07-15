import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const apiClient = axios.create(
    {
        baseURL: `${API_URL}SeminarioProyecto/v1`,
        withCredentials: true,
        timeout: 10000, 
    }
)

export const loginRequest = async (user) => {
    try {
        return await apiClient.post('/Auth/login', user);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const registerRequest = async (user) => {
    try {
        return await apiClient.post('/Auth/register', user);
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const logoutRequest = async()=> {
    try {
        return await apiClient.post('/Auth/logout')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}
