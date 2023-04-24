import React from "react"
import classes from './CustomSelect.module.css'

const CustomSelect = ({options, defaultValue, value, onChange}) => {
  
    return (
        <select
            className={classes.customSelect} 
            value={value} 
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {options.map(option => 
                <option key={option.id_status} value={option.title}>
                    {option.title}
                </option>
            )}
        </select>
    );
}

export {CustomSelect}