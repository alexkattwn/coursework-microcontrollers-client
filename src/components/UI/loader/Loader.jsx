import React from "react"
import cl from './Loader.module.css'

const Loader = () => {
  
    return (
        <div className={cl.wrapper}>
            <span className={cl.dot}></span>
            <span className={cl.dot}></span>
            <span className={cl.dot}></span>
            <span className={cl.dot}></span>
        </div>
    )
}

export {Loader}