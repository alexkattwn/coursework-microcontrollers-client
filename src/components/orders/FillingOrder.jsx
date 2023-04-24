import { useEffect, useState } from "react"
import { Loader } from "../UI/loader/Loader"
import { useFetching } from "../../hooks/useFetching"
import ProductService from "../../API/ProductService"
import { CustomInput } from "../UI/input/CustomInput"
import { CustomButton } from "../UI/button/CustomButton"
import { useProducts } from "../../hooks/useProducts"
import CustomToast from "../../utils/toast"

const FillingOrder = ({orderProducts, setOrderProducts}) => {

    //состояние для всех товаров
    const [products, setProducts] = useState([])

    //состояние для названия товара
    const [filter, setFilter] = useState({ title: '', code: '' })

    //вызов хука сортировки товаров
    const searchedProducts = useProducts(products, filter)

    //получение товаров
    const [fetchProducts, isProductsLoading, productError] = useFetching(async () => {
        const response = await ProductService.getAll()
        setProducts([...products, ...response.data])
    })
    
    //состояние для текущего товара
    const [currentItem, setCurrentItem] = useState(null);
    
    useEffect(() => {
        fetchProducts()
    }, [])

    //срабатывает, когда взяли товар
    function dragStartHandler(e, item) {
        setCurrentItem(item)
    }
    
    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }
    
    //срабатывает, когда отпустили перемещение товара
    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }
    
    function dragOverHandler(e) {
        e.preventDefault();
        if (e.target.className == 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }
    
    //отпустили товар
    function dropHandler(e) {
        e.preventDefault()
        e.stopPropagation()
    }
    
    //отпускание товара на зоне заказа
    function dropProductHandler(e) {
        //ищем такой товар в заказе
        const product = orderProducts.find(prod => prod.title === currentItem.title)
        if(!product) {
            //делаем новый объект, в котором будет добавлено кол-во товара
            const newOrdProd = {
                id_product: currentItem.id_product,
                title: currentItem.title,
                quantity: 1,
            }
            //добавляем в массив
            setOrderProducts([...orderProducts, newOrdProd])
        } else {
            //изменяем кол-во товара
            product.quantity = Number(product.quantity) + 1
            //перезаписываем массив
            setOrderProducts([...orderProducts])
        }
    }

    const remove = (e) => {
        const id = e.target.parentElement.id
        setOrderProducts([...orderProducts.filter(p => p.id_product !== +id)])
    }

    const changeQuantity = (e) => {
        const id = e.target.parentElement.id
        const product = orderProducts.find(el => el.id_product === +id)
        product.quantity = +(e.target.value)
        if(product.quantity === 0) 
        {
            setOrderProducts([...orderProducts.filter(p => p.id_product !== product.id_product)])
            return CustomToast.warning('Кол-во товара не может быть меньше 1!')
        }
        else setOrderProducts([...orderProducts])
    }

    return (
        <div className="selection_products">
            <div 
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropProductHandler(e)}
                className="new_order"
            >
                <div className="order__title">Заказ</div>
                {orderProducts && orderProducts.map(product =>
                    <div className="order__item" 
                        key={product.id_product}
                        id={ product.id_product }
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                    >
                        <strong>{product.id_product}. {product.title}</strong>
                        <CustomInput
                            style={{ width: '80px' }}
                            value={product.quantity}
                            onChange={changeQuantity}
                            type='number'
                            placeholder="Количество"
                        />
                        <CustomButton onClick={remove}>Удалить</CustomButton>
                    </div>
                )}
            </div>

            <div className="all_products">
                <CustomInput
                    id='searcher__item'
                    type='text'
                    value={filter.title}
                    placeholder='Поиск по названию...'
                    onChange={e => setFilter({...filter, title: e.target.value})}
                />
                {productError &&
                    <div className='error_message'>
                        <h2>Произошла ошибка {productError}</h2>
                    </div>
                }
                {isProductsLoading && 
                    <div className='loader_message'>
                        <Loader/>
                    </div>
                }
                {searchedProducts.map(product =>
                    <div 
                        className="item" 
                        key={product.id_product}
                        onDragStart={(e) => dragStartHandler(e, product)}
                        onDragLeave={(e) => dragLeaveHandler(e)}
                        onDragEnd={(e) => dragEndHandler(e)}
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropHandler(e)}
                        draggable={true}
                    >
                        <strong>{product.id_product}. {product.title}</strong>
                    </div>
                )}
            </div>
        </div>
    )
}

export {FillingOrder}