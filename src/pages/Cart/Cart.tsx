import 'react'
import { formatMoney } from '../../utils'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Button } from '../../components'

type CartProps = {
    cart: Cart[]
}

const Cart = ({ cart }: CartProps) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/')
        }
    }, [cart, navigate])

    return (
        <div>
            <h2>Carrito</h2>
            <div className="mt-4">
                {cart.map((product) => (
                    <div key={product.hash} className="border-[1px] border-primary mb-2 rounded-lg p-2">
                        <p className="truncate">{product.name}</p>
                        <p>X{product.quantity}</p>
                        <p>{product.price}</p>
                        <p>{formatMoney(product.subtotal)}</p>
                    </div>
                ))}
                <Button type="button" className="w-full" onClick={() => navigate('/checkout')}>
                    Finalizar Pedido
                </Button>
            </div>
        </div>
    )
}

export default Cart
