import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { loginRequest } from '../routers/Services/Api'; 
import Cookies from 'js-cookie';
import {toast} from 'sonner'

export const useLogin = () => {
    const { setAuthUser, refreshAuthContext } = UserAuth(); // 👈 Usa refreshAuthContext
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const login = async (data, rememberMe) => {
        setIsLoading(true);
        const user = {
            login: data?.login,
            password: data?.password,
            rememberMe: rememberMe || false
        };
        const response = await loginRequest(user);
        console.log(response);
        
        setIsLoading(false);

        if (response.error) {
            setError(true);
            if (response?.e?.response?.data?.errors) {
                let arrayErrors = response.e.response.data.errors;
                for (const error of arrayErrors) {
                    toast.error(error.message);
                }
            }
            return toast.error(
                response?.e?.response?.data?.msg ||
                response?.e?.data?.msg ||
                'Error al intentar iniciar sesión. Usuario/Correo o contraseña inválidos'
            );
        }

        setError(false);
        const token = Cookies.get('token');
        
        setAuthUser(token);
        const userName = response.data.loggedUser.username;
        toast.success(`Bienvenido ${userName}`);

        try {
            // Actualiza el contexto de autenticación
            await refreshAuthContext();
            
            // Redirige al usuario a la página principal
            navigate('/');
        } catch (error) {
            console.error('Error al actualizar el contexto:', error);
            toast.error('Error al actualizar la sesión');
        }
    };

    return {
        login,
        isLoading,
        error,
        setError
    };
};