import { instance } from "@/api/api.interceptor"
import axios from "axios"
import { IPhoto, IPhotoDto } from "./gallery.interface"

const GALLERY_PATH = "gallery",
    GALLERY_UPLOAD_PATH = GALLERY_PATH + "/upload"

const API_URL = process.env.API_URL

export const GalleryService = {
    get(serviceId?: number, search?: string) {
        return axios.get<IPhoto[]>(`${API_URL}/gallery`, {params: {search, serviceId}})
    },
    getFavorites() {
        return axios.get<IPhoto[]>(API_URL + "/" + GALLERY_PATH)
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