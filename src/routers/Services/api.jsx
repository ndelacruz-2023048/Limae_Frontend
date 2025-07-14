import axios from "axios"

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:3660/SeminarioProyecto/v1',
        withCredentials: true,
        timeout: 10000, 
    }
)

let isRefreshing = false;
let failedQueue = [];

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

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken'); // Asume que guardas el token aquí
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Verifica si el error es 401 y no es una solicitud de refresh
        if (error.response?.status === 401 && !originalRequest._retry && 
            originalRequest.url !== '/Auth/refresh') {
            
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return apiClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await apiClient.post('/Auth/refresh');
                const newToken = response.data.token;
                
                // Almacena el nuevo token
                localStorage.setItem('accessToken', newToken);
                
                // Actualiza los headers
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                
                // Procesa la cola de solicitudes fallidas
                processQueue(null, newToken);
                
                // Reintenta la solicitud original
                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                
                // Si el refresh falla, redirige a login
                if (refreshError.response && 
                    (refreshError.response.status === 401 || refreshError.response.status === 403)) {
                    localStorage.removeItem('accessToken');
                    window.location.href = '/login';
                }
                
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