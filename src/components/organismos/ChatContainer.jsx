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
        <div className="flex flex-col h-full w-full rounded-2xl shadow-lg border border-white/30">
            {/* Header - Fixed height */}
            <div className="flex justify-between items-center p-3 md:p-4 border-b border-white/20 bg-white/10 backdrop-blur-sm rounded-t-2xl flex-shrink-0">
                <div className="flex-1 min-w-0">
                    <ChatHeader setUser={selectedUser}/>
                </div>
                <button 
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 p-2 ml-2 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
                >
                    ✕
                </button>
            </div>

            {/* Messages Container - Flexible height */}
            <div className="
                flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4
                min-h-0 max-h-full
                scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
            ">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <FadeLoader />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <h2 className="text-gray-500 text-center">No hay Mensajes aun</h2>
                    </div>
                ): error ? (
                    <div className="flex justify-center items-center h-full">
                        <h2 className="text-red-500 text-center">Error al cargar los mensajes</h2>
                    </div>
                ) : (
                    <>
                        {messages.map((message) => {
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
                                    className={`flex items-start gap-2 md:gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    {/* Avatar - Hide on small screens for own messages */}
                                    <div className={`mt-1 flex-shrink-0 ${isMe ? 'order-2 hidden sm:block' : ''}`}> 
                                        <div className="size-8 md:size-10 rounded-full border">
                                            {sender?.profPic ? (
                                                <img
                                                    src={sender.profPic}
                                                    alt={`${sender.name} ${sender.surname}`}
                                                    className="size-8 md:size-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <GenerateInitialsAvatar
                                                    name={sender?.name}
                                                    surname={sender?.surname}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Message Bubble */}
                                    <div
                                        className={`
                                            max-w-[85%] sm:max-w-xs md:max-w-md lg:max-w-lg 
                                            px-3 md:px-4 py-2 md:py-3 rounded-lg
                                            ${isMe ? 'order-1' : ''}
                                            ${isMe
                                                ? 'bg-gradient-to-br from-blue-500/80 to-purple-500/80 text-white border-white/20 rounded-br-md'
                                                : 'bg-white/60 text-gray-800 border-white/30 rounded-bl-md shadow-sm'
                                            }
                                        `}
                                    >
                                        {/* Sender name - only show for other users */}
                                        {!isMe && (
                                            <p className="text-xs font-semibold text-gray-500 mb-1">
                                                {sender.name}
                                            </p>
                                        )}

                                        {/* Message content */}
                                        <p className="break-words text-sm md:text-base leading-relaxed">
                                            {message.content}
                                        </p>

                                        {/* Timestamp */}
                                        <div className={`text-xs mt-1 ${isMe ? 'text-right' : 'text-left'}`}>
                                            <time className="text-opacity-70 text-black opacity-70">
                                                {formatDate(message.timestamp)}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {/* Scroll anchor */}
                        <div ref={messageEndRef} />
                    </>
                )}
            </div>

            {/* Input Container - Fixed height */}
            <div className="flex-shrink-0 p-3 md:p-4 border-t border-white/20 bg-white/10 backdrop-blur-sm rounded-b-2xl">
                <InputChat selectedUser={selectedUser}/>
            </div>
        </div>
    )
}