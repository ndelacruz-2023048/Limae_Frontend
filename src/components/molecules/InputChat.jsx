import { Icon } from "@iconify/react/dist/iconify.js"
import { useForm } from 'react-hook-form';
import { useMessage } from "../../hooks/useMessageSend"
import { useSocket } from "../../hooks/useSocket";

export const InputChat = ({ selectedUser }) => {
    const { sendMessage } = useMessage()
    const { register, handleSubmit, formState: {errors}, reset } = useForm(
        {
            mode: 'onChange'
        }
    )
    
    const recipient = selectedUser?._id
    
    const socket = useSocket();

    const onSubmit = async( data ) => {
        await sendMessage(recipient, data);
        reset();
    }

    return (
        <div className="space-y-2">
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                id="chat-form" 
                className='flex items-center gap-2 p-3 rounded-xl'
            >
                <input 
                    type="text" 
                    placeholder="Escribe un mensaje..." 
                    className="flex-1 h-10 px-4 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-200"
                    style={{
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                    {...register('content', {
                        required: {
                            value: true,
                            message: 'El mensaje es obligatorio',
                        }
                    })}
                />
                
                <button 
                    type="submit" 
                    form="chat-form"
                    className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500/80 to-purple-500/80 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:from-blue-600/80 hover:to-purple-600/80 transition-all duration-200 group"
                    style={{
                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                >
                    <Icon 
                        icon="basil:send-outline" 
                        width="20" 
                        height="20"
                        className="group-hover:scale-110 transition-transform duration-200"
                    />
                </button>
            </form>
            
            {errors.content && (
                <div className="px-3">
                    <span className="text-red-500 text-sm bg-red-50/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-red-200/50">
                        {errors.content.message}
                    </span>
                </div>
            )}
        </div>
    )
}