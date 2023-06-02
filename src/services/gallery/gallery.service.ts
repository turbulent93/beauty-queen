import { instance } from "@/api/api.interceptor"
import { IPhoto, IPhotoDto } from "./gallery.interface"

const GALLERY_PATH = "gallery",
    GALLERY_UPLOAD_PATH = GALLERY_PATH + "/upload"

export const GalleryService = {
    get(serviceId: number) {
        return instance.get<IPhoto[]>(`${GALLERY_PATH}/${serviceId}`)
    },
    getById(id: number) {
        return instance.get<IPhoto>(`${GALLERY_PATH}/${id}`)
    },
    post(data:  IPhotoDto) {
        return instance.post(GALLERY_PATH, data)
    },
    delete(id: number) {
        return instance.delete<IPhoto>(`${GALLERY_PATH}/${id}`)
    },
    uploadPhoto(data: FormData) {
        return instance.post<string>(`${GALLERY_UPLOAD_PATH}`, data)
    },
    removePhoto(source: string) {
        return instance.delete(`${GALLERY_PATH}/photo/${source}`)
    }
}