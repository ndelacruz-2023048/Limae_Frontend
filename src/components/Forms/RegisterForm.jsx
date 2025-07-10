import { Icon } from "@iconify/react"
import { NavLink, useNavigate } from "react-router"
import { defineStepper } from '@stepperize/react'
import { PhoneField } from "../molecules/PhoneField"
import { FormProvider, useForm } from "react-hook-form"
import { useRegister } from "../../hooks/useRegister"
import { useState } from "react"

const { useStepper, utils } = defineStepper(
    {
        id: 'personalInfo',
        title: 'Información Personal',
        description: 'Ingresa tus datos personales'
    },
    {
        id: 'accountInfo',
        title: 'Información de la Cuenta',
        description: 'Crea tu cuenta con un usuario y contraseña'
    },
    {
        id: 'extras',
        title: 'Información Adicional',
        description: 'Proporciona información adicional si es necesario'
    },
    {
        id: 'confirmation',
        title: 'Confirmación',
        description: 'Revisa y completa tu registro'
    }
)

export const RegisterForm = () => {
    const { register: nuevo } = useRegister()
    const stepper = useStepper();
    const currentIndex = utils.getIndex(stepper.current.id)

    const navigate = useNavigate()
    const methods = useForm(
        {
        mode: 'onChange'
        }
    )
    const { handleSubmit } = methods;

    const onSubmit = async(data) => {
        if (stepper.isLast) {
            console.log('Registro completo:', data);

            try {
                const success = await nuevo(data); // Intenta registrar el usuario

                if (success) {
                    stepper.reset(); // Reinicia el stepper
                    changeLogin(); // Redirige a /login solo si el registro fue exitoso
                } else {
                    console.error('Por favor corrige los errores e inténtalo nuevamente');
                }
            } catch (error) {
                // Maneja errores generales
                console.error('Error al registrar:', error);
            }
        } else {
            console.log('Datos del paso actual:', data);
            stepper.next();
        }
    }

    const changeLogin = () => {
        navigate('/login')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-gray-200 p-8 rounded-3xl w-96" style={{ boxShadow:  `5px 5px 10px #b3b3b3, -5px -5px 10px #ffffff`}}>
                <h1 className="text-3xl font-bold text-center">Registrate</h1>
                <div className="flex items-center gap-4 mt-4">
                    <StepIndicator 
                        currentStep={currentIndex + 1}
                        totalSteps={stepper.all.length}
                    />
                    <div className="flex flex-col">
                        <h2 className="flex-1 text-lg font-bold">
                            {stepper.current.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {stepper.current.description}
                        </p>
                    </div>
                </div>
                <form id='register' onSubmit={handleSubmit(onSubmit)}  className="mt-8">
                    {stepper.switch(
                        {
                            personalInfo:() => <PersonalInfo methods={methods}/>,
                            accountInfo:() => <AccountInfo methods={methods}/>,
                            extras: () => <AdditionalInfo methods={methods}/>,
                            confirmation: () => <Confirm methods={methods}/>,
                        }
                    )}
                    
                    <div >
                        {!stepper.isLast ? (
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={stepper.prev}
                                    disabled={stepper.isFirst}
                                    className="disabled:opacity-50 bg-transparent rounded-3xl p-2"
                                    style={{ boxShadow:  `5px 5px 8px #c5c5c5, -5px -5px 8px #fbfbfb` }}
                                    >
                                    Anterior
                                </button>
                                <button
                                    type="submit"
                                    className=" bg-transparent rounded-3xl p-2"
                                    style={{ boxShadow:  `5px 5px 8px #c5c5c5, -5px -5px 8px #fbfbfb` }}
                                >
                                    Siguiente
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-end gap-4">
                                <button
                                    type="submit"
                                    form="register"
                                    className="bg-transparent rounded-3xl p-2"
                                    style={{ boxShadow:  `5px 5px 8px #c5c5c5, -5px -5px 8px #fbfbfb` }}
                                >
                                    Enviar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        methods.reset()
                                        stepper.reset()
                                    }}
                                    className="bg-transparent rounded-3xl p-2"
                                    style={{ boxShadow:  `5px 5px 8px #c5c5c5, -5px -5px 8px #fbfbfb` }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>
                </form>
                <NavLink to="/login" className="text-blue-500 hover:underline mt-4 block text-center">
                    Tienes una cuenta? Inicia sesión
                </NavLink>
            </div>
        </div>
    )
}

// @ts-ignore
const StepIndicator = ({
    currentStep,
    totalSteps,
    size = 80,
    strokeWidth = 6,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const fillPercentage = (currentStep / totalSteps) * 100;
    const dashOffset = circumference - (circumference * fillPercentage) / 100;

    return (
        <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size}>
            <title>Step Indicator</title>
            {/* Círculo externo (contorno completo) */}
            <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#a6b6cf" // Color gris claro para el contorno
            strokeWidth={strokeWidth}
            />
            {/* Círculo interno (progreso) */}
            <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#4a7ede" // Color verde brillante para el progreso
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        </svg>
        <div
            className="absolute inset-0 flex items-center justify-center rounded-full text-blue-500"
            style={{ width: size, height: size }}
        >
            <span className="text-sm font-medium" aria-live="polite">
            {currentStep} of {totalSteps}
            </span>
        </div>
        </div>
    );
};


const PersonalInfo = ({methods}) => {
    const { register, formState: { errors } } = methods
    return (
        <FormProvider {...methods}>
            <div className="relative mb-4">
                <Icon icon="qlementine-icons:rename-16" width="16" height="16" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                <input id="name" type="text" placeholder="Nombres completos" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4" 
                    style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }} 
                        {...register('name', {
                            required: {
                                value: true,
                                message: 'Los nombres son obligatorios',
                            }
                        })}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div className="relative mb-4">
                {/* <Icon icon="si:user-fill" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" /> */}
                <Icon icon="qlementine-icons:rename-16" width="16" height="16" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Apellidos Completos" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4" 
                    style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }} 
                        {...register('surname', {
                            required: {
                                value: true,
                                message: 'Los apellidos son obligatorios',
                            }
                        })}
                />
                {errors.surname && <span className="text-red-500 text-sm">{errors.surname.message}</span>}
            </div>
            <div className="relative mb-4">
                {/* <Icon icon="line-md:phone-filled" width="20" height="20" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" /> */}
                <PhoneField/>
            </div>
        </FormProvider>
    )
}

const AccountInfo = ({ methods }) => {
    const { register, formState: { errors } } = methods
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div>
            <div className="relative mb-4">
                <Icon icon="line-md:email-filled" width="20" height="20" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                <input type="email" placeholder="Correo electrónico" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4"
                    style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }}
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'El correo electrónico es obligatorio',
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Formato de correo electrónico inválido'
                        }
                    })}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div className="relative mb-4">
                <Icon icon="si:user-fill" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Usuario" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4"
                    style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }}
                    {...register('username', {
                        required: {
                            value: true,
                            message: 'El nombre de usuario es obligatorio',
                        },minLength: {
                            value: 4,
                            message: 'Debe tener al menos 4 caracteres'
                        },
                        maxLength: {
                            value: 10,
                            message: 'No debe tener más de 10 caracteres'
                        }
                    })}
                />
                {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
            </div>
            <div className="relative mb-4">
                <Icon icon="si:lock-fill" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Contraseña" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4"
                    style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }}
                        {...register('password', 
                            {
                            required: {
                                value: true,
                                message: 'La contraseña es obligatoria',
                            },
                            validate: {
                                hasUpper: value =>
                                    /[A-Z]/.test(value) || "Debe contener al menos una mayúscula",
                                hasLower: value =>
                                    /[a-z]/.test(value) || "Debe contener al menos una minúscula",
                                hasNumber: value =>
                                    /[0-9]/.test(value) || "Debe contener al menos un número",
                                hasSpecial: value =>
                                    /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Debe contener al menos un carácter especial",
                            },
                            minLength: {
                                value: 12,
                                message: 'Debe tener al menos 12 caracteres'
                            },
                            }
                        )}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                        {showPassword ? (
                            <Icon icon="mdi:eye-off" width="20" height="20" />
                        ) : (
                            <Icon icon="mdi:eye" width="20" height="20" />
                        )}
                    </button>
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
        </div>
    )
}

const AdditionalInfo = ({methods}) => {
    const { register, formState: { errors } } = methods
    return (
        <div>
            <div className="relative mb-4">
                <Icon icon="solar:square-academic-cap-bold-duotone" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Codigo academico" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4"
                    style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }}
                    {...register('academicCode', {
                        required: {
                            value: true,
                            message: 'El código académico es obligatorio',
                        },
                        minLength: {
                            value: 4,
                            message: 'Debe tener al menos 4 caracteres'
                        },
                        maxLength: {
                            value: 10,
                            message: 'No debe tener más de 10 caracteres'
                        }
                    })}
                />
                {errors.academicCode && <span className="text-red-500 text-sm">{errors.academicCode.message}</span>}
            </div>
        </div>
    )
}

const Confirm = ({methods}) => {
    const { getValues } = methods
    const values = getValues()
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Confirma tu Registro</h2>
            <div><strong>Nombres: </strong>{values.name}</div>
            <div><strong>Apellidos: </strong>{values.surname}</div>

            <div><strong>Teléfono: </strong>{values.mobilePhone}</div>
            <div><strong>Correo Electrónico: </strong>{values.email}</div>

            <div><strong>Usuario: </strong>{values.username}</div>
            <div><strong>Código Académico: </strong>{values.academicCode}</div>
        </div>
    )
}