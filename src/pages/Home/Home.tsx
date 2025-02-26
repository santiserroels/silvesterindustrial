import 'react'
import { MinusIcon, PhotoIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { Button, SearchBar } from '../../components'

type HomeProps = {
    products: Product[]
    quantities: Record<string, number>
    setQuantities: Dispatch<SetStateAction<Record<string, number>>>
}

const Home = ({ products, quantities, setQuantities }: HomeProps) => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [searchValue, setSearchValue] = useState('')

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

    useEffect(() => {
        if (searchValue !== '') {
            const filteredProducts = products.filter(({ name }) => name.toLocaleLowerCase().includes(searchValue))
            setFilteredProducts(filteredProducts)
        } else {
            setFilteredProducts(products)
        }
    }, [searchValue, products])

    if (products.length === 0) {
        return null
    }

    return (
        <Fragment>
            <SearchBar value={searchValue} setValue={setSearchValue} className="mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {filteredProducts.map(({ sku, name, price, hash, image_id }) => {
                    return (
                        <div key={hash} className="shadow-md border-[1px] border-gray-100 p-4 rounded-lg">
                            {image_id ? (
                                <img
                                    src={`https://drive.google.com/thumbnail?id=${image_id}&sz=w300`}
                                    width="100%"
                                    className="h-[100px] object-contain mb-4"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="flex justify-center items-center h-[100px] mb-4">
                                    <PhotoIcon className="size-10 text-gray-400" />
                                </div>
                            )}
                            <p className="text-primary text-xs">{sku}</p>
                            <p className="line-clamp-2 h-[48px]">{name}</p>
                            <p>{price}</p>
                            <div
                                className={`flex justify-center items-center gap-2 ${sku === '' ? 'mt-[1rem]' : null}`}
                            >
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
                {filteredProducts.length === 0 && <p className="mt-4">No se encontraron resultados...</p>}
            </div>
        </Fragment>
    )
}

export default Home
