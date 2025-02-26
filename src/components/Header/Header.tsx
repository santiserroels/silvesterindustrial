import 'react'
import { memo } from 'react'
import logo from '../../assets/logo.webp'
import { NavLink } from 'react-router'

const Header = memo(() => (
    <header className="w-full shadow-md sticky top-0 bg-white">
        <div className="lg:px-10 px-4 py-2 flex items-center justify-between">
            <NavLink to="/">
                <img src={logo} width="220px" className="md:w-[220px] w-[150px]" alt="logo" />
            </NavLink>
            <div></div>
        </div>
    </header>
))

export default Header
