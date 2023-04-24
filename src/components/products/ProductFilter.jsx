import React from "react"
import { CustomInput } from "../UI/input/CustomInput"

const ProductFilter = ({filter, setFilter}) => {
  
    return (
        <div className="products__search">
            <CustomInput
                value={filter.title}
                onChange={e => setFilter({...filter, title: e.target.value})}
                placeholder='Поиск по названию....'
                />
            <CustomInput
                value={filter.code}
                onChange={e => setFilter({...filter, code: e.target.value})}
                placeholder='Поиск по коду....'
            />
        </div>
    );
}

export {ProductFilter}