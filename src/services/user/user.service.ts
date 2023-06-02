import { instance } from "@/api/api.interceptor"
import { IUserDto } from "./user.interface"

const ADMIN_PATH = "admin"
const REGISTER_PATH = ADMIN_PATH + "/register"
const USERS_PATH = ADMIN_PATH + "/users"

export const UserService = {
    post(data: IUserDto) {
        return instance.post(REGISTER_PATH, data)
    },
    search(search?: string) {
        return instance.get<IUserDto[]>(USERS_PATH, search ? {params: {search}} : {})
    }
}