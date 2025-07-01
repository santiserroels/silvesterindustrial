import 'react'
import logo from '../../assets/logo.webp'
import { NavLink } from 'react-router'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
    total: string
}

const Header = ({ total }: HeaderProps) => (
    <header className="w-full shadow-md sticky top-0 bg-white">
        <div className="lg:px-10 px-4 py-2 flex items-center justify-between">
            <NavLink to="/">
                <img src={logo} width="220px" className="md:w-[220px] w-[150px]" alt="logo" />
            </NavLink>
            <NavLink to="/cart" className="flex items-center gap-2">
                <p>{total}</p>
                <ShoppingCartIcon className="size-6 text-primary" />
            </NavLink>
        </div>
    </header>
)

export default Header
