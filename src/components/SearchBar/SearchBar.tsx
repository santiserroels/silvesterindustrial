import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import 'react'
import { Dispatch, SetStateAction } from 'react'
import { cn } from '../../utils'

type SearchBarProps = {
    value: string
    setValue: Dispatch<SetStateAction<string>>
    className?: string
    inputClassName?: string
}

const SearchBar = ({ value = '', setValue, className, inputClassName }: SearchBarProps) => (
    <div className={cn('flex items-center relative w-full', className)}>
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Buscar..."
            className={cn(
                'inset-shadow-sm rounded-lg p-1 border-[1px] border-gray-200 focus-visible:outline-0 px-7 w-full',
                inputClassName
            )}
        />
        <MagnifyingGlassIcon className="size-4 absolute left-2 text-gray-500" />
    </div>
)

export default SearchBar
