import { MouseEventHandler, PropsWithChildren } from 'react'

type ButtonProps = {
    type?: 'button' | 'submit'
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    variant?: 'primary'
}

const Button = ({ type, onClick, disabled, children, variant }: PropsWithChildren<ButtonProps>) => {
    const className = {
        primary: 'bg-primary p-1 rounded-md text-white hover:bg-red-700 active:bg-red-700 focus:bg-primary',
    }[variant || 'primary']

    return (
        <button type={type || 'button'} onClick={onClick} disabled={disabled} className={className}>
            {children}
        </button>
    )
}

export default Button
