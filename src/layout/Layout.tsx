import 'react'
import { Button, Header } from '../components'
import { JSX, PropsWithChildren } from 'react'
import { useLocation, useNavigate } from 'react-router'

type LayoutProps = {
    total: string
}

type CartFooterProps = {
    total: string
}

const HomeFooter = () => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-end">
            <Button type="button" onClick={() => navigate('cart')}>
                Ir al Carrito
            </Button>
        </div>
    )
}

const CartFooter = ({ total }: CartFooterProps) => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-between">
            <p>Total: {total}</p>
            <Button type="button" onClick={() => navigate('checkout')}>
                Finalizar Pedido
            </Button>
        </div>
    )
}

const Layout = ({ total, children }: PropsWithChildren<LayoutProps>) => {
    const location = useLocation()

    const Footer: JSX.Element | undefined = {
        '/': <HomeFooter />,
        '/cart': <CartFooter total={total} />,
    }[location.pathname]

    return (
        <main className="flex justify-center flex-col h-screen font-poppins">
            <Header />
            <section className="lg:px-10 p-4 flex-1 max-h-full overflow-y-auto">
                <div className="p-2 text-center border-primary mb-4 border-double border-4">
                    <p>
                        <strong>ATENCIÓN CLIENTES:</strong> LOS PRECIOS PUBLICADOS ESTÁN SUJETOS A MODIFICACIONES.
                        RECIÉN AL MOMENTO DE ABONAR SU COMPRA, SE CONGELAN LOS PRECIOS. GRACIAS.
                    </p>
                </div>
                {children}
            </section>
            {Footer ? (
                <footer className="sticky bottom-0 bg-white w-full p-2 shadow-[4px_-6px_6px_-1px_rgba(0,0,0,0.1)] lg:px-10 px-4">
                    {Footer}
                </footer>
            ) : null}
        </main>
    )
}

export default Layout
