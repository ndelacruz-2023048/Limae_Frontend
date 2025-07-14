import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useFormContext, Controller } from 'react-hook-form';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const PhoneField = () => {
    const { control, setValue, formState: { errors }, watch } = useFormContext();

    const handleCountryChange = (value, country) => {
        setValue('mobilePhone', value);
        setValue('countryCode', country.countryCode); // Actualiza el código del país
    };

    const validateMobilePhone = (mobilePhone) => {
    // Limpia el número eliminando espacios y caracteres no numéricos

    if (!mobilePhone) {
        return 'El número de teléfono es requerido';
    }

    const countryCode = watch('countryCode'); // Obtiene el código del país seleccionado

    if (!countryCode) {
        return 'Por favor, selecciona un país';
    }

    // Formatea el número con el código del país
    const formattedNumber = mobilePhone.startsWith('+') ? mobilePhone : `${mobilePhone}`;

    // Parsea el número y verifica su validez
    const parsedNumber = parsePhoneNumberFromString(formattedNumber, countryCode.toUpperCase());

    if (!parsedNumber || !parsedNumber.isValid()) {
        return 'Número inválido para el país seleccionado';
    }

    // Verifica el formato específico para Guatemala
    if (countryCode === 'gt') {
        // Para Guatemala, debe tener 8 dígitos después del prefijo
        if (mobilePhone.length !== 11) { // +502 + 8 dígitos = 11 caracteres
        return 'El número debe tener 8 dígitos para Guatemala.';
        }
    }

    return true;
    }

    return (
        <div className="w-full">
        <label htmlFor="mobilePhone" className="block text-sm font-medium mb-1">
            Teléfono Móvil
        </label>
        <Controller
            name="mobilePhone"
            control={control}
            rules={{
            required: 'Teléfono móvil es obligatorio',
            validate: validateMobilePhone,
            }}
            render={({ field }) => (
            <PhoneInput
                {...field}
                country={'gt'} // País por defecto
                onChange={(value, country) => handleCountryChange(value, country)}
                inputProps={{
                className:
                    'w-full bg-transparent rounded-md p-2 pl-12 focus:ring-2 focus:ring-green-500 focus:border-green-500',
                }}
                containerClass="w-full"
                dropdownClass="z-50"
                enableSearch
                inputStyle={{ boxShadow: `inset 6px 6px 12px #c5c5c5, inset -6px -6px 12px #fbfbfb` }}
                buttonStyle={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: `5px 5px 8px #c5c5c5, -5px -5px 8px #fbfbfb`,
                    borderRadius: '9999px',
                    // padding: '6px 12px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                dropdownStyle={{
                    boxShadow: `5px 5px 8px #c5c5c5, -5px -5px 8px #fbfbfb`,
                    borderRadius: '8px',
                }}
                containerStyle={{
                    boxShadow: `5px 5px 8px #c5c5c5, -5px -5px 8px #fbfbfb`,
                    borderRadius: '8px',
                }}
                searchStyle={{
                    boxShadow: `5px 5px 8px #c5c5c5, -5px -5px 8px #fbfbfb`,
                    borderRadius: '8px',
                }}
            />
            )}
        />
        {errors.mobilePhone && (
            <p className="text-red-500 text-xs mt-1">{errors.mobilePhone.message}</p>
        )}
        </div>
    )
}