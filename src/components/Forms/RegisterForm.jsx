import { Icon } from "@iconify/react"
import { NavLink } from "react-router"
import { defineStepper } from '@stepperize/react'
import { PhoneField } from "../molecules/PhoneField"

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
        id: 'confirmation',
        title: 'Confirmación',
        description: 'Revisa y completa tu registro'
    }
)

export const RegisterForm = () => {
    const stepper = useStepper();
    const currentIndex = utils.getIndex(stepper.current.id)
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
                <form id='login'  className="mt-8">
                    {stepper.switch(
                        {
                            personalInfo:() => <PersonalInfo />,
                            accountInfo:() => <AccountInfo />,

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
                                    type="button"
                                    onClick={stepper.next}
                                    className=" bg-transparent rounded-3xl p-2"
                                    style={{ boxShadow:  `5px 5px 8px #c5c5c5, -5px -5px 8px #fbfbfb` }}
                                >
                                    Siguiente
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Aquí puedes manejar el envío del formulario
                                        console.log('Formulario enviado');
                                    }}
                                >
                                    Enviar
                                </button>
                                <button
                                    type="button"
                                    onClick={stepper.prev}
                                >
                                    Volver
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


const PersonalInfo = () => {
    return (
        <div>
            <div className="relative mb-4">
                {/* <Icon icon="si:user-fill" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" /> */}
                <Icon icon="qlementine-icons:rename-16" width="16" height="16" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Nombres completos" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4" 
                    style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }} 
                        // {...register('login', {
                        //     required: {
                        //         value: true,
                        //         message: 'Usuario o email es obligatorio',
                        //     }
                        // })}
                />
                        {/* {errors.login && <span className="text-red-500 text-sm">Este campo es obligatorio</span>} */}
            </div>
            <div className="relative mb-4">
                {/* <Icon icon="si:user-fill" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" /> */}
                <Icon icon="qlementine-icons:rename-16" width="16" height="16" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Apellidos Completos" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4" 
                    style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }} 
                        // {...register('login', {
                        //     required: {
                        //         value: true,
                        //         message: 'Usuario o email es obligatorio',
                        //     }
                        // })}
                />
                        {/* {errors.login && <span className="text-red-500 text-sm">Este campo es obligatorio</span>} */}
            </div>
            <div className="relative mb-4">
                {/* <Icon icon="si:lock-fill" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" /> */}
                <Icon icon="line-md:phone-filled" width="20" height="20" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                {/* <PhoneField/> */}
            </div>
        </div>
    )
}

const AccountInfo = () => {
    return (
        <div>
            <div className="relative mb-4">
                <Icon icon="line-md:email-filled" width="20" height="20" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                <input type="email" placeholder="Correo electrónico" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4"
                    style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }}
                />
            </div>
            <div className="relative mb-4">
                <Icon icon="si:user-fill" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Usuario" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4"
                    style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }}
                />
            </div>
            <div className="relative mb-4">
                <Icon icon="si:lock-fill" className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-500" />
                <input type="password" placeholder="Contraseña" className="bg-transparent p-2 pl-10 rounded-xl w-full mb-4"
                    style={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }}
                />
            </div>
        </div>
    )
}