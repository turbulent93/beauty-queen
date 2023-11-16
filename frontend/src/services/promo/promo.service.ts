import { instance } from "@/api/api.interceptor"
import axios from "axios"
import { IPromo, IPromoDto } from "./promo.interface"

const PROMO_PATH = process.env.PROMO_PATH!
const API_URL = process.env.API_URL!

export const PromoService = {
    post(data: IPromoDto) {
        return instance.post(PROMO_PATH, data)
    },
    get(search?: string) {
        return axios.get<IPromo[]>(API_URL + PROMO_PATH, search ? {params: {search}} : {})
    },
    update(id: number, data: IPromoDto) {
        return instance.put(`${PROMO_PATH}/${id}`, data)
    },
    getById(id: number) {
        return instance.get<IPromoDto>(`${PROMO_PATH}/${id}`)
    },
    delete(id: number) {
        return instance.delete(`${PROMO_PATH}/${id}`)
    }
}