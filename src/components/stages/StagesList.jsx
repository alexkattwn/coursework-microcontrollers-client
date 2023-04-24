import { StageItem } from "./StageItem"

const StagesList = ({stages}) => {
    
    if(!stages.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Этапы не найдены!
            </h1>
        )
    }

    return (
        <>
            {stages.map(stage =>
                <StageItem key={stage.id_stage} stage={stage}/>
            )}
        </>
    )
}

export {StagesList}