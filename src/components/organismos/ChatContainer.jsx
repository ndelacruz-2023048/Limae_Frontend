import { ChatHeader } from "../molecules/ChatHeader"
import { InputChat } from "../molecules/InputChat";
import { useMessages } from "../../hooks/useMessages";
import { FadeLoader } from 'react-spinners'
import { UserAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef } from "react";
import { GenerateInitialsAvatar } from "../../utils/Avatar";
import { formatDate } from "../../utils/formatDate";


export const ChatContainer = ({selectedUser, onClose}) => {
    const { messages, loading, error } = useMessages(selectedUser._id);
    const { user } = UserAuth()
    const messageEndRef = useRef(null)

    let myId, profPic, name, surname = ''
    if (user) {
        try {
            const decodedToken = jwtDecode(user)
            myId = decodedToken?.uid
            profPic = decodedToken?.photo,
            name = decodedToken?.name,
            surname = decodedToken?.surname
        } catch (error) {
            console.error('Error al decodificar el token:', error)
        }
    }
    

    useEffect(() => {
        if (messageEndRef.current && messages) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages])
    
    return (
        <div className="flex-1 p-4 h-full rounded-2xl shadow-lg border border-white/30">
            <div className="flex justify-between gap-4 items-center">
                <ChatHeader setUser={selectedUser}/>
                <button 
                    onClick={onClose} // ✅ Llamar función para cerrar
                    className="text-gray-500 hover:text-gray-700 p-2"
                >
                    ✕ {/* O usa un ícono de close */}
                </button>
            </div>

            <div className="h-[340px] w-[500px] flex-1 overflow-y-auto p-4 space-y-4 ">
                {loading ? (
                    <FadeLoader />
                ) : messages.length === 0 ? (
                    <h2 className="text-gray-500">No hay Mensajes aun</h2>
                ): error ? (
                    <h2 className="text-red-500">Error al cargar los mensjaes</h2>
                ) : (
                    messages.map(message => {
                        const isMe = message.sender === myId;
                        const sender = isMe ? {
                            myId,
                            name,
                            surname,
                            profPic
                        } : selectedUser;


                        return (
                            <div
                                key={message._id}
                                className={`flex items-start gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                                ref={messageEndRef}
                            >
                                <div className="mt-1"> 
                                    <div className="size-10 rounded-full border">
                                        {sender?.profPic ? (
                                            <img
                                                src={sender.profPic}
                                                alt={`${sender.name} ${sender.surname}`}
                                                className="size-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <GenerateInitialsAvatar
                                                name={sender?.name}
                                                surname={sender?.surname}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                                        isMe
                                            ? 'bg-gradient-to-br from-blue-500/80 to-purple-500/80 text-white border-white/20 rounded-br-md'
                                            : 'bg-white/60 text-gray-800 border-white/30 rounded-bl-md shadow-sm'
                                    }`}
                                >
                                    {!isMe && (
                                        <p className="text-xs font-semibold text-gray-500 mb-1">
                                            {sender.name}
                                        </p>
                                    )}

                                    <p className="break-words">{message.content}</p>

                                    <time className="text-xs text-right mt-1 text-opacity-70 text-black">
                                        {formatDate(message.timestamp)}
                                    </time>
                                </div>
                            </div>

                        )
                    })
                )}
            </div>

            <InputChat selectedUser={selectedUser}/>
        </div>
    )
}
