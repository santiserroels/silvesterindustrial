import 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import { Cart, Checkout, Home } from './pages'
import axios from 'axios'
import { formatMoney, hashData, priceToNumber } from './utils'
import { PRODUCTS_API_URL } from './constants'
import Layout from './layout'

const App = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [quantities, setQuantities] = useState<Record<string, number>>({})

    const getProducts = useCallback(async () => {
        const response: FileResponse = await axios.get(PRODUCTS_API_URL).then((res) => res.data)

        const filteredResponse = response.values.filter((element) => element.length > 5)

        const products = filteredResponse.reduce((accum, current) => {
            const product = current.filter(Boolean)

            if (product.length === 2) {
                accum.push({
                    sku: '',
                    name: product[0],
                    price: product[1],
                    hash: hashData(product[0]),
                })

                return accum
            }

            accum.push({
                sku: product[0],
                name: product[1],
                price: product[2],
                hash: hashData(product[1]),
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
