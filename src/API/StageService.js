import axios from "axios"
import httpLink from "./http-common"

export default class StageService {

    static async getAll() {
        const response = await axios.get(`${httpLink}/api/stages`)
        return response
    }

    static async getOne(num) {
        const response = await axios.get(`${httpLink}/api/stages/num/${num}`)
        return response
    }
}