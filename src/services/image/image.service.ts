import { instance } from "@/api/api.interceptor"

const EMPLOYEE_IMAGES_PATH = process.env.EMPLOYEE_IMAGES_PATH || ""

export const ImageService = {
    uploadEmployeeImage: (data: FormData) => {
        return instance.post<string>(EMPLOYEE_IMAGES_PATH, data)
    },
    removeImage: (name: string) => {
        return instance.delete(`${EMPLOYEE_IMAGES_PATH}/${name}`)
    }
}