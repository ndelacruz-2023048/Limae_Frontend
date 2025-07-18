import { useState } from "react";
import { sendMessageRequest } from "../routers/Services/Api";
import { toast } from "sonner";

export const useMessage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendMessage = async (id, data) => {
        setLoading(true)
        setError(null)

        const message = {
            content: data?.content || '',
        }

        try {
            const response = await sendMessageRequest(id, message)
            setLoading(false)
            
            if(response.error) {
                const backendErrors = response.e?.response?.data?.errors;
                const backendMessage = response.e?.response?.data?.msg;
                if (backendErrors && Array.isArray(backendErrors)) {
                    backendErrors.forEach(err => toast.error(err.msg));
                } else if (backendMessage) {
                    toast.error(backendMessage);
                } else {
                    toast.error('Error desconocido al intentar enviar el mensaje');
                }

                setError(backendErrors || 'Error al enviar el mensajes')
                return false
            }

            // ELIMINAR ESTA LÍNEA - ya no necesitamos emitir desde el frontend
            // if(socket) {
            //     socket.emit('newMessage', message)
            // }
            
            // El mensaje se manejará automáticamente por el evento 'messageConfirmed' del socket
            console.log('Mensaje enviado al servidor:', response.data);
            return true
        } catch (error) {
            setLoading(false);
            setError('Hubo un problema al conectar con el servidor')
            toast.error('Hubo un error al procesar tu solicitud')
            console.error(error)
            return false
        }
    }

    return {
        loading,
        error,
        sendMessage,
    }
}