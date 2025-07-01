import { useSearchParams } from 'react-router'
import { Button } from '../../../../components'
import { useCallback } from 'react'
import { cn } from '../../../../utils'

interface CategoryFilterProps {
    categories: string[]
    containerClassName?: string
}

const CategoryFilter = ({ categories, containerClassName }: CategoryFilterProps) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleFilterCategory = useCallback(
        (category: string) => {
            if (searchParams.get('category') === category) {
                searchParams.delete('category')
                return setSearchParams(searchParams)
            }

            searchParams.set('category', category)
            return setSearchParams(searchParams)
        },
        [searchParams, setSearchParams]
    )

    if (categories.length === 0) {
        return null
    }

    return (
        <div className={cn('flex items-center gap-2 max-w-full overflow-x-auto snap-x', containerClassName)}>
            {categories.map((category) => (
                <Button
                    variant="outline"
                    className={cn(
                        'rounded-full px-2 snap-center text-nowrap md:text-sm text-xs',
                        searchParams.get('category') === category && 'bg-primary text-white'
                    )}
                    key={category}
                    onClick={() => handleFilterCategory(category)}
                >
                    {category}
                </Button>
            ))}
        </div>
    )
}

export default CategoryFilter
