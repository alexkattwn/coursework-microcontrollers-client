import { useNavigate } from "react-router-dom"
import { CustomButton } from "../UI/button/CustomButton"
import moment from 'moment'

const OrderItem = ({order}) => {

    const navigate = useNavigate()

    return (
        <div className="order">
            <div className="order_content">
                {order.is_finished && <b style={{backgroundColor: 'lightgreen'}}>ID: {order.id_order}</b>}
                {!order.is_finished && <b>ID: {order.id_order}</b>}
                <div className="order_dates">
                    <span>Начало производства: {moment(order.date_start,'YYYY-MM-DD[T]HH:mm:ss').format('DD.MM.YYYY')}</span>
                    <span>Конец производства: {moment(order.date_end,'YYYY-MM-DD[T]HH:mm:ss').format('DD.MM.YYYY')}</span>
                </div>
            </div>
            <div>{order.status.title}</div>
            <CustomButton onClick={() => navigate(`/orders/${order.id_order}`)}>
                Подробнее
            </CustomButton>
        </div>
    )
}

export {OrderItem}