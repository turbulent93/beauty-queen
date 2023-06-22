import { instance } from "@/api/api.interceptor"

const EMPLOYEE_IMAGES_PATH = process.env.EMPLOYEE_IMAGES_PATH || "",
    PROMO_IMAGES_PATH = "/promo/photo"

export const ImageService = {
    uploadEmployeeImage: (data: FormData) => {
        return instance.post<string>(EMPLOYEE_IMAGES_PATH, data)
    },
    removeImage: (name: string) => {
        return instance.delete(`${EMPLOYEE_IMAGES_PATH}/${name}`)
    },
    uploadPromoImage: (data: FormData) => {
        return instance.post<string>(PROMO_IMAGES_PATH, data)
    },
    removePromoImage: (name: string) => {
        return instance.delete(`${PROMO_IMAGES_PATH}/${name}`)
    }
}