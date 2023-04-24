import React from "react"
import { CustomSelect } from "../UI/select/CustomSelect";

const OrderFilter = ({statuses, filter, setFilter}) => {
  
    return (
        <div className="order__sorting">
            <CustomSelect
                value={filter.status}
                onChange={selected => setFilter({...filter, status: selected})}
                defaultValue='Сортировка по статусу'
                options={statuses}
            />
            <CustomSelect
                value={filter.sequence}
                onChange={selected => setFilter({...filter, sequence: selected})}
                defaultValue='Сортировка по порядку'
                options={[
                    { id_status: 'old', title: 'Сначала старые' },
                    { id_status: 'new', title: 'Сначала новые' }
                ]}
            />
        </div>
    )
}

export {OrderFilter}