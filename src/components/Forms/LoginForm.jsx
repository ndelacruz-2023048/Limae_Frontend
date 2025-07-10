import { NavLink } from 'react-router';
import { Icon } from "@iconify/react"
import { useLogin } from '../../hooks/useLogin';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
    const { login } = useLogin()
    const { register, handleSubmit, formState: {errors}, reset } = useForm(
        {
            mode: 'onChange'
        }
    )

    const onSubmit = async( data ) => {
        await login(data);
        reset();
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-gray-200 p-8 rounded-3xl w-96" style={{ boxShadow:  `5px 5px 10px #b3b3b3, -5px -5px 10px #ffffff`}}>
                <h1 className="text-3xl font-bold text-center">Bienvenido de nuevo</h1>
                <p className="text-gray-600 text-center mt-2">Inicia sesión para continuar</p>
                <form id='login' onSubmit={handleSubmit(onSubmit)} className="mt-8">
                    <div className="relative mb-4">
                        <Icon icon="si:user-fill" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                        <input type="text" placeholder="Usuario o Email" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4" style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }} 
                        {...register('login', {
                            required: {
                                value: true,
                                message: 'Usuario o email es obligatorio',
                            }
                        })}
                        />
                        {errors.login && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
                    </div>
                    <div className="relative mb-4">
                        <Icon icon="si:lock-fill" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                        <input type="password" placeholder="Contraseña" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4" 
                        style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }} 
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'La contraseña es obligatoria',
                            }
                        })}
                        />
                        {errors.password && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
                    </div>
                    <div className="flex items-center justify-between mb-8 ">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                            <span className="ml-2 text-gray-700">Recordarme</span>
                        </label>
                        <NavLink to="/forgot-password" className="text-blue-500 hover:underline">
                            Contraseña olvidada?
                        </NavLink>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full" form='login'>Login</button>
                </form>
                <NavLink to="/register" className="text-blue-500 hover:underline mt-4 block text-center">
                    No tienes una cuenta? Regístrate
                </NavLink>
            </div>
        </div>
    )
}