import 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import { Cart, Checkout, Home } from './pages'
import axios from 'axios'
import { formatMoney, getImageId, hashData, priceToNumber } from './utils'
import { PRODUCTS_API_URL } from './constants'
import Layout from './layout'

const App = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [quantities, setQuantities] = useState<Record<string, number>>({})

    const getProducts = useCallback(async () => {
        const response: FileResponse = await axios.get(PRODUCTS_API_URL).then((res) => res.data)

        response.values.shift()

        const products = response.values.reduce((accum, current) => {
            accum.push({
                image_id: current[0] ? getImageId(current[0]) : null,
                sku: current[1],
                name: current[2],
                description: current[3],
                price: current[4],
                hash: hashData(current[2]),
                stock: current[5] === 'TRUE',
                category: current[6],
            })

            return accum
        }, [] as Product[])

        setProducts(products)
    }, [])

    const cart: Cart[] = useMemo(() => {
        return Object.entries(quantities)
            .filter(([, value]) => value !== 0)
            .map(([key, value]) => {
                const product = products.find(({ hash }) => hash === key)

                if (!product) {
                    return
                }

                const productPrice = priceToNumber(product.price)

                return {
                    name: product.name,
                    hash: key,
                    quantity: value,
                    price: productPrice,
                    subtotal: productPrice * value,
                }
            })
            .filter((element) => element !== undefined)
    }, [products, quantities])

    const total = useMemo(() => {
        const totalAmount = cart.reduce((accum, current) => {
            accum += current.price * current.quantity

            return accum
        }, 0)

        return formatMoney(totalAmount)
    }, [cart])

    const quantitiesInitialValue = useMemo(() => {
        return products.reduce((accum, current) => {
            accum[current.hash] = 0

            return accum
        }, {} as Record<string, number>)
    }, [products])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    useEffect(() => {
        setQuantities(quantitiesInitialValue)
    }, [products, quantitiesInitialValue])

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <Layout total={total}>
                            <Outlet />
                        </Layout>
                    }
                >
                    <Route
                        index
                        element={<Home products={products} quantities={quantities} setQuantities={setQuantities} />}
                    />
                    <Route path="cart" element={<Cart cart={cart} />} />
                    <Route path="checkout" element={<Checkout cart={cart} total={total} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
