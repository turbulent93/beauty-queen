import { instance } from "@/api/api.interceptor"
import axios from "axios"
import { IService } from "./service.interface"

const SERVICES_PATH = "services"
const API_URL = process.env.API_URL

export const ServiceService = {
    get(search?: string, employeeId?: number, promoId?: number) {
        const path = API_URL + "/" + SERVICES_PATH + (
            employeeId ? "/by-employee/" + employeeId : 
                promoId ? "/by-promo/" + promoId : "")

        return axios.get<IService[]>(path, search ? {params: {search}} : {})
    },
    post(data: IService) {
        return instance.post(SERVICES_PATH, data)
    },
    update(data: IService) {
        return instance.put(`${SERVICES_PATH}/${data.id}`, data)
    },
    getById(id: number) {
        return instance.get<IService>(`${SERVICES_PATH}/${id}`)
    },
    delete(id: number) {
        return instance.delete(`${SERVICES_PATH}/${id}`)
    }
}