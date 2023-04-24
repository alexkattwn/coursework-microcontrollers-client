import axios from "axios"
import httpLink from "./http-common"

export default class ProductService {

    //получение всех товаров по запросу
    static async getAll() {
        const response = await axios.get(`${httpLink}/api/products`)
        return response
    }

    static async create(newProduct) {
        try {
            const response = await axios.post(`${httpLink}/api/products`, newProduct)
            return response
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}