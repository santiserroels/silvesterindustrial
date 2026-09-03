import { createContext } from 'react'

type CartContextValue = {
    products: Product[]
    quantities: Record<string, number>
    setQuantity: (hash: string, quantity: number) => void
    cart: Cart[]
    total: string
    isLoading: boolean
    isFetching: boolean
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export default CartContext
export type { CartContextValue }
