import { useState } from "react"
import { FillingOrder } from "../components/orders/FillingOrder"
import { useNavigate } from "react-router-dom"
import { CustomButton } from "../components/UI/button/CustomButton"
import { SelectionDates } from "../components/orders/SelectionDates"
import moment from 'moment'
import OrderService from "../API/OrderService"
import { ToastContainer } from "react-toastify"
import CustomToast from "../utils/toast"

const OrderCreatePage = () => {

    const navigate = useNavigate()
    //вернутья на одну странцу назад
    const goBack = () => navigate(-1)

    //состояние для товаров в заказе
    const [orderProducts, setOrderProducts] = useState([])

    //состояние для дат заказа
    const [dates, setDates] = useState({date_start: moment(new Date(),'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD'), date_end: ''})

    const createOrder = async () => {
        const newOrder = {
            date_start: dates.date_start,
            date_end: dates.date_end,
            products: [...orderProducts]
        }
        if(dates.date_start && dates.date_end && orderProducts.length > 0) {
            if(dates.date_start > dates.date_end) {
                return CustomToast.warning('Дата начала не может быть больше даты конца!')
            } 
            const response = await OrderService.create(newOrder)
            if(response) {
                return CustomToast.success('Заказ успешно создан!')
            }
        } else {
            return CustomToast.warning('Не выбраны даты или товар!')
        }
    }

    return (
        <div>
            <h2>Создание нового заказа</h2>
            <div className="order__create">
                <div>
                <CustomButton onClick={goBack}>Вернуться назад</CustomButton>
                <CustomButton onClick={createOrder}>Создать заказ</CustomButton>
                </div>

                <SelectionDates dates={dates} setDates={setDates}/>
            </div>
            
            <ToastContainer/>

            <FillingOrder orderProducts={orderProducts} setOrderProducts={setOrderProducts}/>
        </div>
    ) 
}

export {OrderCreatePage}