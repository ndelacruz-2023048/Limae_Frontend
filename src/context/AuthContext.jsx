import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Función para actualizar el usuario y el estado de autenticación
    const setAuthUser = (userData) => {
        console.log('usuario: ', userData)
        if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setIsAuthenticated(false);
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
        setLoading(false);
    };

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
    }, []);

    // Función para actualizar el contexto de autenticación
    const refreshAuthContext = async () => {
        const token = Cookies.get('token', {
            domain: window.location.hostname.includes('amplifyapp.com') ? '.amplifyapp.com' : undefined,
            secure: true,
            sameSite: 'none'
        });
        if (token) {
            setUser(token);
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            loading,
            setAuthUser, 
            clearAuthUser,
            refreshAuthContext // 👈 Agregamos esta función
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};