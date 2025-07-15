import { useEffect, useState } from "react"
import { getMessagesReques } from "../routers/Services/Api"
import { toast } from "sonner";
import { useSocket } from "./useSocket";
import { UserAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export const useMessages = (id) => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const socket = useSocket()
    const { user } = UserAuth()

    // Obtener mi ID del token
    let myId = '';
    if (user) {
        try {
            const decodedToken = jwtDecode(user);
            myId = decodedToken?.uid;
        } catch (error) {
            console.error('Error al decodificar el token:', error);
        }
    }

    const getMessages = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await getMessagesReques(id)
            if(response.error) {
                const backendErrors = response.e?.response?.data?.errors;
                const backendMessage = response.e?.response?.data?.msg;
                if (backendErrors && Array.isArray(backendErrors)) {
                    backendErrors.forEach(err => toast.error(err.msg));
                } else if (backendMessage) {
                    toast.error(backendMessage);
                } else {
                    toast.error('Error desconocido al intentar obtener los usuarios conectados');
                }

                setError(backendErrors || 'Error al obtener los mensajes')
                return false
            }
            setMessages(response.data.messages)
            setLoading(false)
            return true
        } catch (error) {
            setLoading(false);
            setError(error);
            console.error("Error fetching chat messages:", error);
            toast.error('Hubo un problema al conectar con el servidor');
            return false;
        }
    }

    useEffect(() => {
        getMessages()
    }, [id])

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            console.log("Nuevo mensaje recibido:", newMessage);
            
            // Solo agregar si el mensaje es parte de esta conversación
            if (newMessage.sender === id || newMessage.recipient === id) {
                setMessages((prev) => {
                    // Evita duplicados
                    const alreadyExists = prev.some((msg) => msg._id === newMessage._id);
                    if (alreadyExists) return prev;
                    return [...prev, newMessage];
                });
            }
        };

        const handleMessageConfirmed = (confirmedMessage) => {
            console.log("Mensaje confirmado:", confirmedMessage);
            
            // Solo agregar si el mensaje es para esta conversación
            if (confirmedMessage.recipient === id) {
                setMessages((prev) => {
                    // Evita duplicados
                    const alreadyExists = prev.some((msg) => msg._id === confirmedMessage._id);
                    if (alreadyExists) return prev;
                    return [...prev, confirmedMessage];
                });
            }
        };

        // Escuchar ambos eventos
        socket.on("newMessage", handleNewMessage);
        socket.on("messageConfirmed", handleMessageConfirmed);

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.off("messageConfirmed", handleMessageConfirmed);
        };
    }, [socket, id])

    return {
        messages,
        loading,
        error,
        refresh: getMessages
    }
}