import 'react'
import { useField } from 'formik'
import ErrorMessage from '../ErrorMessage'

type SelectInputFieldProps = {
    name: string
    options: [string, string][]
    label?: string
}

const SelectInputField = ({ name, label, options }: SelectInputFieldProps) => {
    const [field, meta, helpers] = useField<string>(name)
    const { setValue } = helpers
    const showError = !!meta.error && meta.touched

    const handleChange = (value: string) => {
        setValue(value)
    }

    return (
        <div className="relative flex w-full flex-col gap-2 mb-2">
            {label && <label>{label}</label>}
            <select
                value={field.value}
                name={name}
                onChange={(e) => handleChange(e.target.value)}
                className="inset-shadow-sm rounded-lg p-1 border-[1px] border-gray-200 focus-visible:outline-0"
            >
                {options.map(([option, value]) => (
                    <option value={value}>{option}</option>
                ))}
            </select>
            {showError && <ErrorMessage>{meta.error}</ErrorMessage>}
        </div>
    )
}

export default SelectInputField
