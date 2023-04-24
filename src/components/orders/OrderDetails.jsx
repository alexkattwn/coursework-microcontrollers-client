import moment from 'moment'
import { CustomButton } from '../UI/button/CustomButton'

const OrderDetails = ({order, goProductStages, suspendOrder, produceOrder}) => {

    const moving = (id) =>  goProductStages(id)

    const isProduced= (produced) => {
        if(produced) return 'Готово'
        return 'Не готово'
    }

    const produce = (id) => produceOrder(id, 'В производстве')

    const suspend = (id) => suspendOrder(id, 'Приостановлен')
    
    return (
        <div className="order__details">
            <div className="order__content">
                <h3>Заказ ID: {order.id_order}</h3>
                <span>Текущий статус: {order.status.title}</span>
                <span>Дата начала: {moment(order.date_start,'YYYY-MM-DD[T]HH:mm:ss').format('DD.MM.YYYY')}</span>
                <span>Дата конца: {moment(order.date_end,'YYYY-MM-DD[T]HH:mm:ss').format('DD.MM.YYYY')}</span>
                {!order.is_finished &&
                    <>
                        {order.status.title === 'В производстве' &&
                            <CustomButton id='order__btn__red' onClick={() => suspend(order.id_order)}>
                                Приостановить производство
                            </CustomButton>
                        }
                        {(order.status.title === 'В очереди' || order.status.title === 'Приостановлен') &&
                            <CustomButton id='order__btn__yellow' onClick={() => produce(order.id_order)}>
                                Начать производство
                            </CustomButton>
                        }   
                    </>
                }
            </div>
            <h3>Товары</h3>
            <div className='order__products'>
                {order.products.map(product => 
                    <div className='order__product__item' key={product.id_product}>
                        <div>
                            <b>{product.title}</b>
                            <div>{product.OrderProducts.quantity} шт. </div>
                            {product.OrderProducts.is_produced &&
                                <div id='product__done__blue'>
                                    {isProduced(product.OrderProducts.is_produced)}
                                </div>
                            }
                            {!product.OrderProducts.is_produced &&
                                <div id='product__done__red'>
                                    {isProduced(product.OrderProducts.is_produced)}
                                </div>
                            }
                        </div>
                        <CustomButton id='btn_check_stages' onClick={() => moving(product.OrderProducts.id_order_product)}>
                            Этапы производства
                        </CustomButton>  
                    </div>
                )}
            </div>
        </div>
    )
}

export {OrderDetails}