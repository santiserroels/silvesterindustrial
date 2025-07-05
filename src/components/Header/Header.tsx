import 'react'
import logo from '../../assets/logo.webp'
import { NavLink, useLocation, useNavigate } from 'react-router'
import Button from '../Button'

interface HeaderProps {
    total: string
}

const Header = ({ total }: HeaderProps) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const buttonPropsByPathname = {
        '/': {
            to: 'cart',
            button: 'Carrito',
        },
        '/cart': {
            to: '/checkout',
            button: 'Comprar',
        },
    }[pathname as string]

    return (
        <header className="w-full shadow-md sticky top-0 bg-white">
            <div className="lg:px-10 px-4 py-2 flex items-center justify-between">
                <NavLink to="/">
                    <img src={logo} width="220px" className="md:w-[220px] w-[150px]" alt="logo" />
                </NavLink>
                {buttonPropsByPathname && (
                    <div className="flex items-center gap-2">
                        <p>{total}</p>
                        <Button onClick={() => navigate(buttonPropsByPathname.to)}>
                            {buttonPropsByPathname.button}
                        </Button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
