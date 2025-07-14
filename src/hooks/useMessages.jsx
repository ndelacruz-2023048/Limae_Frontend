import { useEffect, useState } from "react"
import { getMessagesReques } from "../routers/Services/api"
import { toast } from "sonner";
import { useSocket } from "./useSocket";

export const useMessages = (id) => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const socket = useSocket()


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
        const handleNewMessage = (newMessage) => {
            console.log("Nuevo mensaje recibido:", newMessage);
            setMessages((prev) => {
                // Evita duplicados
                const alreadyExists = prev.some((msg) => msg._id === newMessage._id);
                if (alreadyExists) return prev;
                return [...prev, newMessage];
            });
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket])

    return {
        messages,
        loading,
        error,
        refresh: getMessages
    }
}
