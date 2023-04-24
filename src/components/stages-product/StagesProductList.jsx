import { StagesProductItem } from './StagesProductItem'
import styles from './StagesProductList.module.css'

const StagesProductList = ({stages}) => {
    
    if(!stages.length) {
        return (
            <h2 style={{textAlign: 'center'}}>
                Начатых этапов пока нет...
            </h2>
        )
    }

    return (
        <div className={styles.stages}>
            {stages.map(stage => 
                <StagesProductItem key={stage.id_product_stage} stage={stage}/>
            )}
        </div>
    )
}

export {StagesProductList}