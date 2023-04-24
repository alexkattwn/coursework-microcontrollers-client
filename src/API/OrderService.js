import axios from "axios"
import httpLink from "./http-common"

export default class OrderService {

    //получение всех заказов по запросу
    static async getAll() {
        const response = await axios.get(`${httpLink}/api/orders`)
        return response
    }

    static async getById(id) {
        const response = await axios.get(`${httpLink}/api/orders/${id}`)
        return response
    }

    static async create(newOrder) {
        try {
            const response = await axios.post(`${httpLink}/api/orders`, newOrder)
            return response
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    static async getProductStages(id) {
        const response = await axios.get(`${httpLink}/api/orders/stages-product/${id}`)
        return response
    }

    static async updateStatus(id, title) {
        const response = await axios.put(`${httpLink}/api/orders/${id}`, { title })
        return response
    }

    static async getProduce(title) {
        const response = await axios.get(`${httpLink}/api/orders/in-production/${title}`)
        return response
    }
}