import { useEffect, useState } from "react";
import { getUserConnected } from "../routers/Services/Api";
import { toast } from "sonner";
import { UserAuth } from "../context/AuthContext";

export const useChatUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUsers = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await getUserConnected()
            if (response.error) {
                const backendErrors = response.e?.response?.data?.errors;
                const backendMessage = response.e?.response?.data?.msg;
                if (backendErrors && Array.isArray(backendErrors)) {
                    backendErrors.forEach(err => toast.error(err.msg));
                } else if (backendMessage) {
                    toast.error(backendMessage);
                } else {
                    toast.error('Error desconocido al intentar obtener los usuarios conectados');
                }

                setError(backendMessage || 'Error al obtener los usuarios conectados');
                return false
            }
            setUsers(response.data.users);
            setLoading(false);
            return true;
        } catch (error) {
            setLoading(false);
            setError(error);
            console.error("Error fetching chat users:", error);
            toast.error('Hubo un problema al conectar con el servidor');
            return false;
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return { 
        users,
        loading,
        error,
    };
}