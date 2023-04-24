import { Outlet } from 'react-router-dom'
import { CustomNavbar } from './CustomNavbar'

const Layout = () => (
    <>
        <CustomNavbar/>

        <div className='App'>
            <Outlet/>
        </div>

        <footer>Production 2023</footer>
    </>
)

export {Layout}