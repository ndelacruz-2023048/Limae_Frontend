import { useChatUsers } from "../hooks/useChatUsers"
import { FadeLoader } from 'react-spinners'
import { GenerateInitialsAvatar } from "../utils/Avatar";
import { UserAuth } from "../context/AuthContext";

export const SidebarChat = ({ onUserSelect }) => {
    const { users, loading, error } = useChatUsers();

    const { isOnline } = UserAuth()

    return (
        <aside className="w-64 h-full bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold">Chats</h2>
            {loading ? (
                <FadeLoader />
            ) : users.length === 0 ? (
                <h2 className="text-gray-500">No hay usuario registrados</h2>
            ): error ? (
                <h2 className="text-red-500">Error al cargar los usuarios</h2>
            ) : (
                <ul className="mt-2">
                    {users.map(user => (
                        <div key={user._id} onClick={() => onUserSelect(user)}>
                            <div className="p-2 mb-2 bg-gray-100 rounded-lg shadow-sm flex items-center cursor-pointer hover:bg-gray-200 transition-colors">
                                {user.profilePicture ? (
                                    <picture>
                                        <source srcSet={user.profilePicture} type="image/webp" />
                                        <img src={user.profilePicture} alt={`${user.name} ${user.surname}`} 
                                            className="w-11 h-11 rounded-full object-cover" />
                                    </picture>
                                ) : (
                                    <GenerateInitialsAvatar name={user.name} surname={user.surname} />
                                )}
                                <div className="ml-2">
                                    <h3 className="text-sm font-semibold">{user.name}<br />{user.surname}</h3>
                                    <p className={`text-xs ${
                                        isOnline.includes(user._id) ? 'text-green-600' : 'text-gray-500'
                                    }`}>
                                        {isOnline.includes(user._id) ? 'En línea' : 'Desconectado'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
        </aside>
    )
}
