import { useEffect, useState } from "react"
import { useFetching } from "../hooks/useFetching"
import StageService from "../API/StageService"
import { Loader } from "../components/UI/loader/Loader"
import { StagesList } from "../components/stages/StagesList"

const StagesPage = () => {
    //массив с этапами производства
    const [stages, setStages] = useState([])
    
    const [fetchStages, isStagesLoading, stageError] = useFetching(async () => {
        const response = await StageService.getAll()
        //помещаем данные в конец массива
        setStages([...stages, ...response.data])
    })
    
    //заполнение массива заказами
    //отработает про создании компонента
    useEffect(() => {
        fetchStages()
    }, [])

    return (
        <div className="stages_page">
            {stageError &&
                <div className='error_message'>
                    <h1>Произошла ошибка {stageError}</h1>
                </div>
            }
            {isStagesLoading && 
                <div className='loader_message'>
                    <Loader/>
                </div>
            }
            <div className="stages">
                <StagesList stages={stages}/>
            </div>
        </div>
    )
}

export {StagesPage}