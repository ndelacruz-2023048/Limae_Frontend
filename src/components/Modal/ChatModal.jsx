import { useState } from 'react';
import { SidebarChat } from '../../sidebar/sidebarChat';
import { ChatContainer } from '../organismos/ChatContainer';

export const ChatModal = ({ isOpen, onClose }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    return (
        <div
            className="absolute bottom-[calc(100% + 10px)] right-7 top-72 bg-white rounded shadow-md z-50 flex flex-col"
            style={{
                boxShadow: '5px 5px 10px #bababa, -5px -5px 10px #ffffff',
            }}
        >
            {/* Header con botón de cierre */}
            <div className="flex justify-end p-2 border-b">
                <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                onClick={onClose}
                >
                ×
                </button>
            </div>

            {/* Contenido con scroll si hay mucho contenido */}
            <div className="flex-1 overflow-y-auto p-2 flex gap-4">
                <SidebarChat onUserSelect={setSelectedUser} />
                { selectedUser ? (
                    <ChatContainer selectedUser={selectedUser} />
                ) : (
                    <div className="flex-1 flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md h-full">
                        <h2 className="text-gray-500 h-[444px] w-[500px]">Selecciona un usuario para iniciar el chat</h2>
                    </div>
                )}
            </div>
        </div>
    );
};