import { useState } from 'react';
import { SidebarChat } from '../../sidebar/sidebarChat';
import { ChatContainer } from '../organismos/ChatContainer';

export const ChatModal = ({ isOpen, onClose }) => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleCloseChat = () => {
        setSelectedUser(null);
    };

    return (
        <div
            className="
                fixed inset-0 z-50 flex items-center justify-center p-4
                md:absolute md:inset-auto md:bottom-[calc(100% + 10px)] md:right-7 md:top-44
                md:rounded-3xl md:shadow-2xl md:flex-col md:overflow-hidden
                rounded-lg shadow-2xl flex-col overflow-hidden
                w-full h-full
                md:w-[344px] md:h-[650px] md:min-w-[800px] md:max-w-[1000px]
                lg:min-w-[900px] lg:max-w-[1200px]
                xl:min-w-[1000px] xl:max-w-[1400px]
            "
            style={{
                background: 'linear-gradient(135deg, #f0f4ff 0%, #f8f0ff 50%, #fff0f8 100%)',
            }}
        >
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Círculo grande difuminado */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
                
                {/* Círculo mediano */}
                <div className="absolute top-1/3 -left-24 w-48 h-48 bg-gradient-to-br from-purple-200/25 to-pink-200/25 rounded-full blur-2xl"></div>
                
                {/* Círculo pequeño */}
                <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-blue-200/30 rounded-full blur-2xl"></div>
            </div>

            {/* Header con botón de cierre */}
            <div className="relative z-10 flex justify-end p-4 border-b border-white/20 bg-white/10 backdrop-blur-sm">
                <button
                    className="px-3 py-1 bg-gray-200 rounded-full bg-transparent text-md hover:bg-white/20 transition-colors"
                    onClick={onClose}
                    style={{
                        boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff',
                    }}
                >
                    ×
                </button>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 flex-1 overflow-hidden p-4 flex flex-col md:flex-row gap-4">
                {/* Sidebar - oculto en móvil cuando hay usuario seleccionado */}
                <div className={`
                    bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg
                    w-full md:w-80 lg:w-96 xl:w-64 2xl:w-64 flex-shrink-0
                    ${selectedUser ? 'hidden md:block' : 'block'}
                `}>
                    <SidebarChat onUserSelect={setSelectedUser} />
                </div>
                
                {/* Chat Container */}
                {selectedUser ? (
                    <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg min-h-0 relative">
                        {/* Botón de volver en móvil */}
                        <button
                            className="md:hidden absolute top-4 left-4 z-20 px-3 py-1 bg-white/70 rounded-full text-sm hover:bg-white/80 transition-colors"
                            onClick={handleCloseChat}
                        >
                            ← Volver
                        </button>
                        <ChatContainer selectedUser={selectedUser} onClose={handleCloseChat} />
                    </div>
                ) : (
                    <div className="
                        flex-1 flex items-center justify-center p-4 
                        bg-white/40 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30
                        min-h-[400px] md:min-h-[520px]
                        w-full md:w-[540px]
                    ">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full mb-4 mx-auto flex items-center justify-center">
                                <div className="w-8 h-8 bg-white/40 rounded-full"></div>
                            </div>
                            <h2 className="text-gray-600 text-lg font-medium">Selecciona un usuario</h2>
                            <p className="text-gray-500 text-sm mt-1">para iniciar el chat</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};