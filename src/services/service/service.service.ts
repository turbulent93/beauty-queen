import { instance } from "@/api/api.interceptor"
import { IService } from "./service.interface"

const SERVICES_PATH = "services"

export const ServiceService = {
    get(search?: string) {
        return instance.get<IService[]>(SERVICES_PATH, search ? {params: {search}} : {})
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