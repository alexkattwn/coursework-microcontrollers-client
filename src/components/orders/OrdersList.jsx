import { OrderItem } from "./OrderItem"
import { TransitionGroup, CSSTransition } from "react-transition-group"

const OrdersList = ({orders}) => {
    
    //если заказов нет в массиве
    if(!orders.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Заказы не найдены!
            </h1>
        )
    }

    return (
        <>
           <TransitionGroup>
                {orders.map(order =>
                    <CSSTransition
                        key={order.id_order}
                        timeout={500}
                        classNames="order"
                    >
                        <OrderItem order={order}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </>
    )
}

export {OrdersList}