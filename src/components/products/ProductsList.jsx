import { ProductItem } from "./ProductItem"

const ProductsList = ({products}) => {
    
    //если товаров нет в массиве
    if(!products.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Товары не найдены!
            </h1>
        )
    }

    return (
        <>
            {products.map(product =>
                <ProductItem product={product} key={product.id_product}/>
            )}
        </>
    )
}

export {ProductsList}