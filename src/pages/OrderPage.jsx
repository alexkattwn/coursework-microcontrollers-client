import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CustomButton } from '../components/UI/button/CustomButton'
import OrderService from "../API/OrderService"
import { useFetching } from "../hooks/useFetching"
import { Loader } from "../components/UI/loader/Loader"
import { OrderDetails } from "../components/orders/OrderDetails"
import CustomToast from '../utils/toast'
import { ToastContainer } from "react-toastify"

const OrderPage = () => {

    const params = useParams()

    const [order, setOrder] = useState({
        id_order: 0,
        date_start: null,
        date_end: null,
        is_finished: false,
        id_status: 0,
        products: [{
            id_product: 0,
            title: '',
            code: '',
            OrderProducts: {}
        }],
        status: {
            title: ''
        }
    })

    const [fetchOrder, isLoading, error] = useFetching(async () => {
        const response = await OrderService.getById(params.id)
        setOrder(response.data)
    })

    useEffect(() => {
        fetchOrder()
    }, [])

    const navigate = useNavigate()
    //вернутья на одну странцу назад
    const goBack = () => navigate(-1)
    const goProductStages = (id) =>  navigate(`/orders/products/${id}/stages`)

    const updateStatus = async (id, status) => {
        if(status === 'В производстве') {
            const produce = await OrderService.getProduce('В производстве')
            if(produce.data) {
                return CustomToast.warning('Сейчас уже идет производство!')
            }
            const response = await OrderService.updateStatus(id, status)
            if(response.statusText == 'OK') {
                fetchOrder()
                return CustomToast.success('Заказ отправлен на производство!')
            }
        } else if (status === 'Приостановлен') {
            const response = await OrderService.updateStatus(id, status)
            if(response.statusText == 'OK') {
                fetchOrder()
                return CustomToast.success('Производство приостановлено!')
            }
        }
    }

    return (
        <div>
            <CustomButton onClick={goBack}>Вернуться назад</CustomButton>
            {error &&
                <div className='error_message'>
                    <h1>Произошла ошибка {error}</h1>
                </div>
            }
            <ToastContainer/>
            {isLoading
                ? <div className='loader_message'>
                    <Loader/>
                </div>
                : <OrderDetails 
                    order={order} 
                    goProductStages={goProductStages} 
                    suspendOrder={updateStatus}
                    produceOrder={updateStatus}
                />
            }
        </div>
    ) 
}

export {OrderPage}