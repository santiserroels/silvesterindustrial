import 'react'
import { useField } from 'formik'
import ErrorMessage from '../ErrorMessage'

type TextInputFieldProps = {
    name: string
    label?: string
    placeholder?: string
    type?: 'text' | 'email' | 'password'
}

const TextInputField = ({ name, label, placeholder, type }: TextInputFieldProps) => {
    const [field, meta, helpers] = useField<string>(name)
    const { setValue } = helpers
    const showError = !!meta.error && meta.touched

    const handleChange = (value: string) => {
        setValue(value)
    }

    return (
        <div className="relative flex w-full flex-col gap-2 mb-2">
            {label && <label>{label}</label>}
            <input
                value={field.value}
                name={name}
                onChange={(e) => handleChange(e.target.value)}
                type={type || 'text'}
                placeholder={placeholder}
                className="inset-shadow-sm rounded-lg p-1 border-[1px] border-gray-200 focus-visible:outline-0"
            />
            {showError && <ErrorMessage>{meta.error}</ErrorMessage>}
        </div>
    )
}

export default TextInputField
