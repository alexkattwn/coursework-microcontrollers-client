const StageItem = (props) => {
    
    return (
        <div className="stage__item">
            №{props.stage.number} {props.stage.title}
            <div className="stage__item__title">
                {props.stage.description}
            </div>
        </div>
    )
}

export {StageItem}