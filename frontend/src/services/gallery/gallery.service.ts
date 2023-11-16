import { instance } from "@/api/api.interceptor"
import axios from "axios"
import { IPhoto, IPhotoDto } from "./gallery.interface"

const GALLERY_PATH = process.env.GALLERY_PATH!
const API_URL = process.env.API_URL

export const GalleryService = {
    get(serviceId?: number, search?: string) {
        return axios.get<IPhoto[]>(API_URL + GALLERY_PATH, {params: {serviceId, search}})
    },
    getFavorites() {
        return axios.get<IPhoto[]>(API_URL + GALLERY_PATH)
    },
    getById(id: number) {
        return instance.get<IPhoto>(`${GALLERY_PATH}/${id}`)
    },
    post(data:  IPhotoDto) {
        return instance.post(GALLERY_PATH, data)
    },
    delete(id: number) {
        return instance.delete<IPhoto>(`${GALLERY_PATH}/${id}`)
    }
}