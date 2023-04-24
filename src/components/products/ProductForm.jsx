import React, { useState } from "react"
import { CustomButton } from "../UI/button/CustomButton"
import { CustomInput } from "../UI/input/CustomInput"

const ProductForm = ({create}) => {
    //состояние для нового товара
    const [product, setProduct] = useState({ title: '', code: '' })

    //функция добавления товара
    const addNewProduct = (e) => {
        e.preventDefault()
        create({...product})
        setProduct({ title: '', code: '' })
    }
  
    return (
        <form className="product__form">
            <CustomInput
                value={product.title}
                onChange={e => setProduct({ ...product, title: e.target.value })}
                type='text'
                placeholder="Название товара"
            />
            <CustomInput
                value={product.code}
                onChange={e => setProduct({ ...product, code: e.target.value })}
                type='text'
                placeholder="Код товара"
            />
            <CustomButton style={{ marginTop: '5px' }} onClick={addNewProduct}>Создать товар</CustomButton>
        </form>
    )
}

export {ProductForm}