import 'react'
import { Dispatch, Fragment, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { SearchBar } from '../../components'
import { useSearchParams } from 'react-router'
import { CategoryFilter, Product } from './components'

type HomeProps = {
    products: Product[]
    quantities: Record<string, number>
    setQuantities: Dispatch<SetStateAction<Record<string, number>>>
}

const Home = ({ products, quantities, setQuantities }: HomeProps) => {
    const [searchParams] = useSearchParams()
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [searchValue, setSearchValue] = useState('')

    const setQuantity = useCallback(
        (hash: string, quantity: number) => {
            return setQuantities((prevState) => {
                if (quantity < 0) {
                    return prevState
                }

                return { ...prevState, [hash]: quantity }
            })
        },
        [setQuantities]
    )

    const categories = useMemo(
        () =>
            products.reduce((accum, current) => {
                const categoryIndex = accum.findIndex((category) => category === current.category)

                if (categoryIndex === -1) {
                    accum.push(current.category)
                }

                return accum
            }, [] as string[]),
        [products]
    )

    useEffect(() => {
        if (searchValue !== '' && searchParams.get('category')) {
            const filteredProducts = products.filter(
                ({ name, category }) =>
                    name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) &&
                    category === searchParams.get('category')
            )
            return setFilteredProducts(filteredProducts)
        }

        if (searchValue !== '') {
            const filteredProducts = products.filter(({ name }) =>
                name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
            )
            return setFilteredProducts(filteredProducts)
        }

        if (searchParams.get('category')) {
            const filteredProducts = products.filter(({ category }) => category === searchParams.get('category'))
            return setFilteredProducts(filteredProducts)
        }

        setFilteredProducts(products)
    }, [searchValue, products, searchParams])

    if (products.length === 0) {
        return null
    }

    return (
        <Fragment>
            <SearchBar value={searchValue} setValue={setSearchValue} className="mb-2" />
            <CategoryFilter categories={categories} containerClassName="my-4" />
            {searchParams.get('category') && (
                <div className="flex items-center w-full my-4">
                    <h2 className="border-b-2 border-primary">{searchParams.get('category')}</h2>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <Product product={product} quantities={quantities} setQuantity={setQuantity} key={product.hash} />
                ))}
                {filteredProducts.length === 0 && <p className="mt-4">No se encontraron resultados...</p>}
            </div>
        </Fragment>
    )
}

export default Home
