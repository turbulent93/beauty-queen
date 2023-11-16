import { instance } from "@/api/api.interceptor"
import { IFile } from "./upload.interface"

const UPLOAD_IMAGES_PATH = process.env.UPLOAD_IMAGES_PATH!

export const UploadService = {
    upload: (data: FormData) => {
        return instance.post<IFile[]>("/upload", data)
    },
    remove: (id: number) => {
        return instance.delete(`${UPLOAD_IMAGES_PATH}/${id}`)
    }
}