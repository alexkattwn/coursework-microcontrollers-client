const ProductItem = (props) => {
    
    return (
        <div className="product">
            <div className="product__content">
                <strong>{props.product.id_product}. {props.product.title}</strong>
                <div className="stage__item__title">
                    код: {props.product.code}
                </div>
            </div>
        </div>
    )
}

export {ProductItem}