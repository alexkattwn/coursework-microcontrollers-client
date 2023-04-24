import { useNavigate, useParams } from "react-router-dom"
import { CustomButton } from "../components/UI/button/CustomButton"
import { useEffect, useState } from "react"
import OrderService from "../API/OrderService"
import { useFetching } from "../hooks/useFetching"
import { StagesProductList } from "../components/stages-product/StagesProductList"
import { Loader } from "../components/UI/loader/Loader"

const ProductStagesPage = () => {

    const params = useParams()
    const navigate = useNavigate()
    const goBack = () => navigate(-1)

    const [stages, setStages] = useState([])

    const [fetchStages, isLoading, error] = useFetching(async () => {
        const response = await OrderService.getProductStages(params.id)
        setStages([...stages, ...response.data])
    })

    useEffect(() =>{
        fetchStages()
    }, [])

    return (
        <>
            <CustomButton onClick={() => goBack()}>Вернуться назад</CustomButton>
            {error &&
                <div className='error_message'>
                    <h1>Произошла ошибка {error}</h1>
                </div>
            }
            {isLoading && 
                <div className='loader_message'>
                    <Loader/>
                </div>
            }
            <StagesProductList stages={stages}/>
        </>
    )
}

export {ProductStagesPage}
