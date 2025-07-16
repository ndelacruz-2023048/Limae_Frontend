import { useChatUsers } from "../hooks/useChatUsers"
import { FadeLoader } from 'react-spinners'
import { GenerateInitialsAvatar } from "../utils/Avatar";
import { UserAuth } from "../context/AuthContext";

export const SidebarChat = ({ onUserSelect }) => {
    const { users, loading, error } = useChatUsers();

    const { isOnline } = UserAuth()

    return (
        <aside className="lg:w-64 2xl:lg:w-64 h-full shadow-md rounded-lg p-2 sm:p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold">Chats</h2>
            {loading ? (
                <FadeLoader />
            ) : users.length === 0 ? (
                <h2 className="text-gray-500">No hay usuario registrados</h2>
            ): error ? (
                <h2 className="text-red-500">Error al cargar los usuarios</h2>
            ) : (
                <div className="space-y-3">
                    {users.map(user => (
                        <div 
                            key={user._id} 
                            onClick={() => onUserSelect(user)}
                            className="group cursor-pointer"
                        >
                            <div className="relative bg-gradient-to-br from-white/80 to-gray-50/80 
                                            rounded-xl p-4 
                                            transition-all duration-300 ease-out
                                            backdrop-blur-sm
                                            border border-white/20"
                                style={{ boxShadow: `5px 5px 10px #bebebe, -5px -5px 10px #ffffff` }}
                            >
                                
                                {/* Efecto de brillo sutil */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                                rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <div className="relative flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-100 
                                                    p-0.5">
                                            {user.profilePicture ? (
                                                <picture>
                                                    <source srcSet={user.profilePicture} type="image/webp" />
                                                    <img 
                                                        src={user.profilePicture} 
                                                        alt={`${user.name} ${user.surname}`} 
                                                        className="w-full h-full rounded-full object-cover" 
                                                    />
                                                </picture>
                                            ) : (
                                                <div className="w-full h-full rounded-full overflow-hidden">
                                                    <GenerateInitialsAvatar name={user.name} surname={user.surname} />
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Indicador de estado online */}
                                        {isOnline.includes(user._id) && (
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full 
                                                          border-2 border-white shadow-lg animate-pulse"></div>
                                        )}
                                    </div>
                                    
                                    {/* Información del usuario */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-800 text-sm truncate">
                                            {user.name} {user.surname}
                                        </h3>
                                        <div className="flex items-center space-x-1 mt-1">
                                            <div className={`w-2 h-2 rounded-full ${
                                                isOnline.includes(user._id) ? 'bg-green-500' : 'bg-gray-400'
                                            }`}></div>
                                            <p className={`text-xs font-medium ${
                                                isOnline.includes(user._id) ? 'text-green-600' : 'text-gray-500'
                                            }`}>
                                                {isOnline.includes(user._id) ? 'En línea' : 'Desconectado'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Flecha indicadora */}
                                    <div className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </aside>
    )
}
