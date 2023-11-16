import { instance } from "@/api/api.interceptor"
import { IUpdateUserDto, IUser } from "./user.interface"

const USERS_PATH = process.env.USERS_PATH!

export const UserService = {
    get(search?: string, onlyNotEmployees?: boolean, excludedId?: number) {
        return instance.get<IUser[]>(USERS_PATH, {params: {search, onlyNotEmployees, excludedId}})
    },
    getById(id: number) {
        return instance.get<IUser>(`${USERS_PATH}/${id}`)
    },
    delete(id: number) {
        return instance.delete(`${USERS_PATH}/${id}`)
    },
    update(data: IUpdateUserDto) {
        return instance.put(`${USERS_PATH}/${data.id}`, data)
    }
}