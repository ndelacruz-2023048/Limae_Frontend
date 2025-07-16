import { useState } from 'react';
import { logoutRequest, setLoggingOut } from '../routers/Services/Api'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import {jwtDecode} from 'jwt-decode'

export const useLogout = () => {
    const [isLoadingLogout, setIsLoadingLogout] = useState(false)
    const [errorLogout, setErrorLogout] = useState(false)
    const { clearAuthUser, user } = UserAuth()
    const navigate = useNavigate()

    const logout = async () => {
        setIsLoadingLogout(true)
        setErrorLogout(false)
        setLoggingOut(true) // Marcar que estamos haciendo logout

        const response = await logoutRequest(); 

        setIsLoadingLogout(false)

        if (response?.error) {
            setErrorLogout(true)
            setLoggingOut(false) // Resetear la flag si hay error
            toast.error('Error al cerrar sesión')
            console.error('Error al cerrar sesión:', response.e)
            return false;
        }

        let userName = ''
        if (user) {
            try {
                const decodedToken = jwtDecode(user)
                userName = decodedToken?.name
            } catch (error) {
                console.error('Error al decodificar el token:', error)
            }
        }
        clearAuthUser();
        setLoggingOut(false) // Resetear la flag después del logout
        navigate('/login')
        toast.success(`Sesión cerrada exitosamente, hasta pronto ${userName || ''}`)
        return true
    }

    return {
        logout,
        isLoadingLogout,
        errorLogout,
    }
}