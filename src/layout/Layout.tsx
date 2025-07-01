import 'react'
import { Header, Footer } from '../components'
import { PropsWithChildren } from 'react'

type LayoutProps = {
    total: string
}

const Layout = ({ total, children }: PropsWithChildren<LayoutProps>) => {
    return (
        <main className="flex justify-center flex-col h-screen font-poppins">
            <Header total={total} />
            <section className="lg:px-10 p-4 flex-1 max-h-full overflow-y-auto">
                <div className="p-2 text-center border-primary mb-4 border-double border-4">
                    <p>
                        <strong>ATENCIÓN CLIENTES:</strong> LOS PRECIOS PUBLICADOS ESTÁN SUJETOS A MODIFICACIONES.
                        RECIÉN AL MOMENTO DE ABONAR SU COMPRA, SE CONGELAN LOS PRECIOS. GRACIAS.
                    </p>
                </div>
                {children}
            </section>
            <Footer />
        </main>
    )
}

export default Layout
