import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div>
            Этой страницы не существует. Вернуться на <Link to="/">Главную страницу</Link>
        </div>
    ) 
}

export {NotFoundPage}