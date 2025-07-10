import axios from "axios"

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:3660/SeminarioProyecto/v1',
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