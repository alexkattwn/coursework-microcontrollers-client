import React from "react"
import cl from './CustomModal.module.css'

const CustomModal = ({children, visible, setVisible}) => {

    const rootClasses = [cl.customModal]

    if(visible) {
        rootClasses.push(cl.active)
    }
    
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.customModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default CustomModal