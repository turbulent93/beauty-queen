import { instance } from "@/api/api.interceptor"
import { ISpecDto, ISpec } from "./spec.interface"

const SPECS_PATH = "/specializations"

export const SpecService = {
    get(search?: string) {
        return instance.get<ISpec[]>(SPECS_PATH, search ? {params: {search}} : {})
    },
    getById(id: number) {
        return instance.get<ISpec>(`${SPECS_PATH}/${id}`)
    },
    post(data: ISpecDto) {
        return instance.post(SPECS_PATH, data)
    },
    update(data: ISpec) {
        return instance.put(`${SPECS_PATH}/${data.id}`, data)
    },
    delete(id: number) {
        return instance.delete(`${SPECS_PATH}/${id}`)
    }
}