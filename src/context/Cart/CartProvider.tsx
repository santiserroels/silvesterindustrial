import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import { useProducts } from '../../queries'
import { formatMoney, priceToNumber } from '../../utils'
import CartContext from './CartContext'

const CartProvider = ({ children }: PropsWithChildren) => {
    const { data: products = [], isLoading, isFetching } = useProducts()
    const [quantities, setQuantities] = useState<Record<string, number>>({})

    const setQuantity = useCallback((hash: string, quantity: number) => {
        return setQuantities((prevState) => {
            if (quantity < 0) {
                return prevState
            }

            return { ...prevState, [hash]: quantity }
        })
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

    useEffect(() => {
        setQuantities((prevState) => {
            return products.reduce((accum, current) => {
                accum[current.hash] = prevState[current.hash] ?? 0

                return accum
            }, {} as Record<string, number>)
        })
    }, [products])

    const value = useMemo(
        () => ({ products, quantities, setQuantity, cart, total, isLoading, isFetching }),
        [products, quantities, setQuantity, cart, total, isLoading, isFetching]
    )

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
