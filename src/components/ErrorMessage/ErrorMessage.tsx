import 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => (
    <div className="text-red-600 bg-red-200 flex items-center gap-2 px-2 py-1 rounded-lg">
        <ExclamationCircleIcon className="size-4" /> {children}
    </div>
)

export default ErrorMessage
