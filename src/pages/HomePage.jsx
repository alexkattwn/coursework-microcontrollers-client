import { useEffect, useState } from "react"
import OrderService from "../API/OrderService"
import { useFetching } from "../hooks/useFetching"
import { OrdersList } from "../components/orders/OrdersList"
import { Loader } from "../components/UI/loader/Loader"
import { useNavigate } from "react-router-dom"
import { CustomButton } from "../components/UI/button/CustomButton"
import StatusService from "../API/StatusService"
import { useSortOrder } from "../hooks/useSortOrder"
import { OrderFilter } from "../components/orders/OrderFilter"

const HomePage = () => {
    //массив с заказами
    const [orders, setOrders] = useState([])
    //массив со статусами
    const [statuses, setStatuses] = useState([{id_status: 0, title: 'Все'}])
    const [filter, setFilter] = useState({ status: '', sequence: '' })

    const sortedOrders = useSortOrder(orders, filter.status, filter.sequence)
    
    const [fetchOrders, isOrdersLoading, orderError] = useFetching(async () => {
        const response = await OrderService.getAll()
        //помещаем данные в конец массива
        setOrders([...orders, ...response.data])
    })

    async function fetchStatuses () {
        const response = await StatusService.getAll()
        setStatuses([...statuses, ...response.data])
    }
    
    //заполнение массива заказами
    //отработает про создании компонента
    useEffect(() => {
        fetchOrders()
        fetchStatuses()
    }, [])

    const navigate = useNavigate()
    const goCreateOrder = () =>  navigate('/orders/create')

    return (
        <div>
            <h1>Все заказы</h1>
            <div className="header__order__page">
                <CustomButton onClick={goCreateOrder}>Создать новый заказ</CustomButton>
                <OrderFilter statuses={statuses} filter={filter} setFilter={setFilter}/>
            </div>

            {orderError &&
                <div className='error_message'>
                    <h1>Произошла ошибка {orderError}</h1>
                </div>
            }
            {isOrdersLoading && 
                <div className='loader_message'>
                    <Loader/>
                </div>
            }
            <OrdersList orders={sortedOrders}/>
        </div>
    )
}

export {HomePage}