import { MouseEventHandler, PropsWithChildren } from 'react'
import { cn } from '../../utils'

type ButtonProps = {
    type?: 'button' | 'submit'
    onClick?: MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    variant?: 'primary' | 'outline'
    className?: string
}

const Button = ({
    type,
    onClick,
    disabled,
    children,
    variant = 'primary',
    className,
}: PropsWithChildren<ButtonProps>) => {
    const variantClassName: string = {
        primary: 'bg-primary text-white hover:bg-red-700 active:bg-red-700 focus:bg-primary',
        outline:
            'bg-white text-primary hover:bg-primary hover:text-white active:bg-primary active:text-white border border-primary',
    }[variant]

    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            disabled={disabled}
            className={cn('p-1 rounded-md', variantClassName, className)}
        >
            {children}
        </button>
    )
}

export default Button
