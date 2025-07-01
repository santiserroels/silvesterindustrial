import { cn } from '../../../../utils'
import { MinusIcon, PhotoIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Button } from '../../../../components'

interface ProductProps {
    product: Product
    quantities: Record<string, number>
    setQuantity: (hash: string, quantity: number) => void
}

const Product = ({ product, quantities, setQuantity }: ProductProps) => {
    const { sku, name, price, hash, image_id, stock, description, category } = product

    return (
        <div
            className={cn(
                'shadow-md border-[1px] border-gray-100 p-4 rounded-lg relative',
                !stock && 'pointer-events-none grayscale-100 opacity-50'
            )}
        >
            <div className="bg-primary text-white text-center text-xs absolute top-0 left-0 p-1 w-full truncate">
                {category}
            </div>
            {image_id ? (
                <img
                    src={`https://drive.google.com/thumbnail?id=${image_id}&sz=w300`}
                    width="100%"
                    className="h-[100px] object-contain mb-4 mt-4"
                    referrerPolicy="no-referrer"
                />
            ) : (
                <div className="flex justify-center items-center h-[100px] mb-4 mt-4">
                    <PhotoIcon className="size-10 text-gray-400" />
                </div>
            )}
            <p className="text-primary text-xs">{sku}</p>
            <p className="line-clamp-2 h-[48px]">{name}</p>
            <p>{price}</p>
            <p className="text-gray-400 text-xs line-clamp-2 h-[34px] mb-1">{description}</p>
            <div className={`flex justify-center items-center gap-2 ${sku === '' ? 'mt-[1.25rem]' : null}`}>
                <Button type="button" onClick={() => setQuantity(hash, quantities[hash] - 1)} disabled={!stock}>
                    <MinusIcon className="size-4" />
                </Button>
                <input
                    value={quantities[hash]}
                    type="number"
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[4.5rem] text-center focus-visible:outline-0 inset-shadow-sm rounded-lg p-1 border-[1px] border-gray-200"
                    onChange={(e) => {
                        if (stock) {
                            setQuantity(hash, Number(e.target.value))
                        }
                    }}
                    disabled={!stock}
                />
                <Button type="button" onClick={() => setQuantity(hash, quantities[hash] + 1)} disabled={!stock}>
                    <PlusIcon className="size-4" />
                </Button>
            </div>
        </div>
    )
}

export default Product
