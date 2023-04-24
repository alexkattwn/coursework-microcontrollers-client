import axios from "axios"
import httpLink from "./http-common"

export default class StatusService {

    static async getAll() {
        const response = await axios.get(`${httpLink}/api/statuses`)
        return response
    }
}