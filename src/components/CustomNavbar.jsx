import { CustomLink } from "./CustomLink"

const CustomNavbar = () => (
    <header>
        <CustomLink to="/">Главная страница</CustomLink>
        <CustomLink to="/products">Товары</CustomLink>
        <CustomLink to="/stages">Этапы</CustomLink>
    </header>
)

export {CustomNavbar}