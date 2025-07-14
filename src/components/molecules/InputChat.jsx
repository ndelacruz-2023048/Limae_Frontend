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
        await sendMessage(recipient, data, socket);
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} id="chat-form" className='h-10 flex items-center'>
                <input type="text" placeholder="Escribe un mensaje" className="w-full h-full input input-bordered rounded-lg input-sm sm:input-md bg-transparent"
                    {...register('content', {
                        required: {
                            value: true,
                            message: 'El mensaje es obligatorio',
                        }
                    })}
                />
                {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
                <button type="submit" form="chat-form">
                    <Icon icon="basil:send-outline" width="24" height="24"/>
                </button>
            </form>
        </div>
    )
}
