import 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import { Cart, Checkout, Home } from './pages'
import Layout from './layout'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <Layout>
                            <Outlet />
                        </Layout>
                    }
                >
                    <Route index element={<Home />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
