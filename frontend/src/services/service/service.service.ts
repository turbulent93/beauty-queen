import { instance } from "@/api/api.interceptor"
import axios from "axios"
import { IService } from "./service.interface"

const SERVICE_PATH = process.env.SERVICE_PATH!
const API_URL = process.env.API_URL

export const ServiceService = {
    get(search?: string, employeeId?: number, promoId?: number) {
        return axios.get<IService[]>(API_URL + SERVICE_PATH, {params: {search, employeeId, promoId}})
    },
    post(data: IService) {
        return instance.post(SERVICE_PATH, data)
    },
    update(data: IService) {
        return instance.put(`${SERVICE_PATH}/${data.id}`, data)
    },
    getById(id: number) {
        return instance.get<IService>(`${SERVICE_PATH}/${id}`)
    },
    delete(id: number) {
        return instance.delete(`${SERVICE_PATH}/${id}`)
    }
}