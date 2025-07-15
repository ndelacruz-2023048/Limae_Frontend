import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const apiClient = axios.create(
    {
        baseURL: `${API_URL}/SeminarioProyecto/v1`,
        withCredentials: true,
        timeout: 10000, 
    }
)

let isRefreshing = false;
let failedQueue = [];

// Variable para almacenar la función de actualización del contexto
let refreshAuthContextCallback = null;

// Función para establecer el callback del contexto
export const setAuthContextCallback = (callback) => {
    refreshAuthContextCallback = callback;
};

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
}

apiClient.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Solo intentamos refrescar si es un error 401 y no es la ruta de refresh
        if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== '/Auth/refresh'
        ) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
            }).then(token => {
            return apiClient(originalRequest);
            }).catch(err => {
            return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            await apiClient.post('/Auth/refresh'); // refreshToken va en cookie, no en headers

            // IMPORTANTE: Después de renovar el token, actualizar el contexto
            if (refreshAuthContextCallback) {
                await refreshAuthContextCallback();
            }

            processQueue(null, true);
            // Una vez renovado, reintentamos la solicitud original
            return apiClient(originalRequest); // El nuevo token viene en cookie
        } catch (refreshError) {
            processQueue(refreshError, null);
            window.location.href = '/login';
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
        }

        return Promise.reject(error);
    }
);


//Login
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


//Register
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

//Logout
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


//Get User Connected to chat
export const getUserConnected = async () => {
    try {
        return await apiClient.get('/Chat/users')
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getMessagesReques = async (id) => {
    try {
        return await apiClient.get(`/Chat/${id}`)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const sendMessageRequest = async (id, message) => {
    try {
        return await apiClient.post(`/Chat/send/${id}`, message)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}