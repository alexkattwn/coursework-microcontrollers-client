import { useEffect, useState } from 'react'
import StageService from '../../API/StageService'
import { useFetching } from '../../hooks/useFetching'
import styles from './StagesProductItem.module.css'
import moment from 'moment'
import { Loader } from '../UI/loader/Loader'

const StagesProductItem = ({stage}) => {

    const [part, setPart] = useState(null)
    
    const dateShow = (date) => {
        if(date) {
            return moment(date,'YYYY-MM-DD[T]HH:mm:ss').format('DD.MM.YYYY HH:mm')
        } else {
            return 'Этап еще не окончен'
        }
    }

    const [fetchStage, isLoading, error] = useFetching(async () => {
        const response = await StageService.getOne(stage.id_stage)
        setPart(response.data)
    })

    useEffect(() => {
        fetchStage()
    }, [])

    return (
        <div className={styles.stage}>
            {isLoading && 
                <div className='loader_message'>
                    <Loader/>
                </div>
            }
            {part && 
                <>
                    <div className={styles.part}>
                        <div className={styles.partHead}>Этап: {part.title}</div>
                        <div>Начало этапа: {dateShow(stage.date_start)}</div>
                        <div>Конец этапа: {dateShow(stage.date_end)}</div>
                        <div className={styles.partDesc}>Описание</div>
                        <div className={styles.partBody}>{part.description}</div>
                        {stage.date_end && <div className={styles.line__blue}/>}
                        {!stage.date_end && <div className={styles.line__red}/>}
                    </div>
                </>
            }
        </div>
    )
}

export {StagesProductItem}