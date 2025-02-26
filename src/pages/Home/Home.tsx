import 'react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '../../components'

type HomeProps = {
    products: Product[]
    quantities: Record<string, number>
    setQuantities: Dispatch<SetStateAction<Record<string, number>>>
}

const Home = ({ products, quantities, setQuantities }: HomeProps) => {
    const addQuantity = (hash: string) => {
        return setQuantities((prevState) => ({ ...prevState, [hash]: prevState[hash] + 1 }))
    }

    const dismQuantity = (hash: string) => {
        return setQuantities((prevState) => {
            if (prevState[hash] === 0) {
                return prevState
            }

            return { ...prevState, [hash]: prevState[hash] - 1 }
        })
    }

    if (products.length === 0) {
        return null
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.map(({ sku, name, price, hash }) => {
                return (
                    <div key={hash} className="shadow-md border-[1px] border-gray-100 p-4 rounded-lg">
                        <p className="text-primary text-xs">{sku}</p>
                        <p className="line-clamp-2 h-[48px]">{name}</p>
                        <p>{price}</p>
                        <div className={`flex justify-center items-center gap-2 ${sku === '' ? 'mt-[1.5rem]' : null}`}>
                            <Button type="button" onClick={() => dismQuantity(hash)}>
                                <MinusIcon className="size-4" />
                            </Button>
                            <p>{quantities[hash]}</p>
                            <Button type="button" onClick={() => addQuantity(hash)}>
                                <PlusIcon className="size-4" />
                            </Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Home
