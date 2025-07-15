import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { socketConnection } from '../socket/Socket';
import {jwtDecode} from 'jwt-decode'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isOnline, setIsOnline] = useState([]);

    useEffect(() => {
        socketConnection.connect();

        socketConnection.on("connect", () => {
        console.log("✅ Conectado al servidor con id:", socketConnection.id);
        });

        socketConnection.on("disconnect", () => {
        console.log("❌ Desconectado del servidor");
        });

        return () => {
        socketConnection.disconnect(); // solo si cierras la app
        };
    }, [])

    // Función para actualizar el usuario y el estado de autenticación
    const setAuthUser = (userData) => {
        if (userData) {
            setUser(userData);
            setIsAuthenticated(true)

            try {
            const decoded = jwtDecode(userData);
            const userId = decoded?.uid;

            if (userId && !socketConnection.connected) {
                socketConnection.io.opts.query = {
                    userId // ✅ Pasamos el userId en la conexión
                };
                socketConnection.auth = { token: userData }; // opcional
                socketConnection.connect();
            }
        } catch (error) {
            console.error("Error al decodificar token:", error);
        }

        } else {
            setUser(null);
            setIsAuthenticated(false);
            socketConnection.disconnect()
        }
        setLoading(false)
    };

    const clearAuthUser = () => {
        setUser(null);
        setIsAuthenticated(false);
        Cookies.remove('token', {
            domain: window.location.hostname.includes('amplifyapp.com') ? '.amplifyapp.com' : undefined,
            secure: true,
            sameSite: 'none',
            path: '/'
        });
        socketConnection.disconnect()
        setLoading(false);
    };

    useEffect(() => {
        const handleGetOnlineUsers = (users) => {
            setIsOnline(users);
        };

        socketConnection.on("getOnlineUsers", handleGetOnlineUsers);

        return () => {
            socketConnection.off("getOnlineUsers", handleGetOnlineUsers);
        };
    }, [])

    // Cargar sesión desde cookies al iniciar
    useEffect(() => {
        const token = Cookies.get('token', {
            domain: window.location.hostname.includes('amplifyapp.com') ? '.amplifyapp.com' : undefined,
            secure: true,
            sameSite: 'none'
        });
        if (token) {
            setAuthUser(token);
        } else {
            setLoading(false);
        }
    }, [])

    // NUEVA FUNCIÓN: Función para actualizar el contexto de autenticación
    const refreshAuthContext = async () => {
        const token = Cookies.get('token', {
            domain: window.location.hostname.includes('amplifyapp.com') ? '.amplifyapp.com' : undefined,
            secure: true,
            sameSite: 'none'
        });
        if (token) {
            setUser(token);
            setIsAuthenticated(true);
            
            // IMPORTANTE: También actualizar el socket con el nuevo token
            try {
                const decoded = jwtDecode(token);
                const userId = decoded?.uid;
                
                if (userId && socketConnection.connected) {
                    socketConnection.auth = { token }; // Actualizar el token en el socket
                }
            } catch (error) {
                console.error("Error al decodificar token actualizado:", error);
            }
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    // NUEVO: Listener para cambios en las cookies
    useEffect(() => {
        const checkTokenChanges = () => {
            const currentToken = Cookies.get('token', {
                domain: window.location.hostname.includes('amplifyapp.com') ? '.amplifyapp.com' : undefined,
                secure: true,
                sameSite: 'none'
            });
            
            // Solo actualizar si el token cambió
            if (currentToken !== user) {
                if (currentToken) {
                    setAuthUser(currentToken);
                } else {
                    clearAuthUser();
                }
            }
        };

        // Verificar cambios cada segundo (puedes ajustar el intervalo)
        const interval = setInterval(checkTokenChanges, 1000);

        return () => clearInterval(interval);
    }, [user]); // Depende de user para detectar cambios

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            loading,
            setAuthUser, 
            clearAuthUser,
            refreshAuthContext,
            isOnline,
            socket: socketConnection
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};