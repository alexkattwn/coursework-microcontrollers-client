import { useMemo } from "react"

//хук сортировки по коду товара
export const useSearchByCode = (products, code) => {
    //отсортированный массив товаров
    const sortedProducts = useMemo(() => {
        //если поле, по которому будет происходить сортировка, не пустое
        if (code) {
            return products.filter(product => product.code.toLowerCase().includes(code.toLowerCase()))
        }
        return products
    }, [code, products])  //code - переменная от которой зависит массив products

    return sortedProducts
}

//хук сортироки по названию
export const useProducts = (products, filter) => {
    //вызов хука сортировки
    const sortedProducts = useSearchByCode(products, filter.code)
    //useMemo позволяет изменять изменять массив по изменению переменной query
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedProducts.filter(product => product.title.toLowerCase().includes(filter.title.toLowerCase()))
    }, [filter.title, sortedProducts])

    return sortedAndSearchedPosts
}