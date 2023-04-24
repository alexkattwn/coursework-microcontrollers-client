import { useEffect, useState } from 'react'
import ProductService from '../API/ProductService'
import { ProductForm } from '../components/products/ProductForm'
import { CustomButton } from '../components/UI/button/CustomButton'
import { Loader } from '../components/UI/loader/Loader'
import CustomModal from '../components/UI/modal-window/CustomModal'
import { useFetching } from '../hooks/useFetching'
import { ProductsList } from '../components/products/ProductsList'
import { ProductFilter } from '../components/products/ProductFilter'
import { useProducts } from '../hooks/useProducts'
import { ToastContainer } from "react-toastify"
import CustomToast from '../utils/toast'

const ProductsPage = () => {
    //массив с товарами
    const [products, setProducts] = useState([])
    //состояние для открытия/скрытия модального окна
    const [modal, setModal] = useState(false)
    //состояние для полей сортировки (input и select)
    const [filter, setFilter] = useState({ title: '', code: '' })
    //вызов хука сортировки товаров
    const searchedProducts = useProducts(products, filter)

    const [fetchProducts, isProductsLoading, productError] = useFetching(async () => {
        const response = await ProductService.getAll()
        //помещаем данные в конец массива
        setProducts([...products, ...response.data])
    })

    //заполнение массива товарами
    //отработает про создании компонента
    useEffect(() => {
        fetchProducts()
    }, [])

    //создание нового товара
    const createProduct = async (newProduct) => {
        if(newProduct.title && newProduct.code) {
            const response = await ProductService.create(newProduct)
            if(response) {
                //добавление нового товара в массив
                setProducts([...products, response.data])
                return CustomToast.success('Товар успешно создан!')
            }
        } else {
            return CustomToast.warning('Не все поля заполнены!')
        }
        //закрытие модального окна
        setModal(false)
    }

    return (
        <>
            <CustomButton onClick={() => setModal(true)}>
                Создать товар
            </CustomButton>
            <CustomModal visible={modal} setVisible={setModal}>
                <ProductForm create={createProduct} />
            </CustomModal>

            <ProductFilter
                filter={filter} 
                setFilter={setFilter} 
            />

            <ToastContainer/>

            {productError &&
                <div className='error_message'>
                    <h1>Произошла ошибка {productError}</h1>
                </div>
            }
            {isProductsLoading && 
                <div className='loader_message'>
                    <Loader/>
                </div>
            }
            <ProductsList products={searchedProducts}/>
        </>
    )
}

export {ProductsPage}