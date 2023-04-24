import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductsPage } from './pages/ProductsPage'
import { OrderPage } from './pages/OrderPage'
import { OrderCreatePage } from './pages/OrderCreatePage'
import { StagesPage } from './pages/StagesPage'
import { ProductStagesPage } from './pages/ProductStagesPage'

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='products' element={<ProductsPage/>}/>
        <Route path='orders/:id' element={<OrderPage/>}/>
        <Route path='orders/products/:id/stages' element={<ProductStagesPage/>}/>
        <Route path='orders/create' element={<OrderCreatePage/>}/>
        <Route path='stages' element={<StagesPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>                    
    </Route>
))

const App = () => (
    <RouterProvider router={router}/>
)

export default App