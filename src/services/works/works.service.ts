import { instance } from "@/api/api.interceptor"
import { IWork, IWorkDto } from "./works.interface"

const WORKS_PATH = "gallery/works"

export const WorksService = {
    get(search?: string) {
        return instance.get<IWork[]>(WORKS_PATH, search ? {params: {search}} : {})
    },
    post(data: IWorkDto) {
        return instance.post(WORKS_PATH, data)
    }
}