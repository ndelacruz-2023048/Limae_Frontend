import React from 'react'
import { GenerateInitialsAvatar } from '../../utils/Avatar';
import { useChatUsers } from '../../hooks/useChatUsers';
import { UserAuth } from '../../context/AuthContext';

export const ChatHeader = ({ setUser }) => {
    const { isOnline } = UserAuth()

    return (
        <div className=' p-4 bg-transparent rounded-lg w-full h-full flex items-center text-white'>
            {setUser.profilePicture ? (
                <picture>
                    <source srcSet={setUser.profilePicture} type="image/webp" />
                        <img src={setUser.profilePicture} alt={`${setUser.name} ${setUser.surname}`} className="w-11 h-11 rounded-full object-cover" />
                </picture>
            ) : (
                <GenerateInitialsAvatar name={setUser.name} surname={setUser.surname} />
            )}
            <div className="ml-2">
                <h3 className="text-sm font-semibold text-black">{setUser.name} {setUser.surname}</h3>
                <p className={`text-xs ${
                    isOnline.includes(setUser._id) ? 'text-green-600' : 'text-gray-500'
                }`}>
                    {isOnline.includes(setUser._id) ? 'En línea' : 'Desconectado'}
                </p>
            </div>
        </div>
    )
}
