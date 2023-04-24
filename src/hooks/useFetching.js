import { useState } from "react"

export const useFetching = (callback) => {
    //состояние для отображения загрузки
    const [isLoading, setIsLoading] = useState(false)
    //состояние для ошибок
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            //идет загрузка
            setIsLoading(true)
            //вызов функции
            await callback()
        } catch (e) {
            //если есть ошибка при загрузке
            setError(e.message)
        } finally {
            //загрузка окончена (выполняется в любом случае)
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}