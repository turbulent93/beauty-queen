import { instance } from "@/api/api.interceptor"
import { IRole } from "./roles.interface"

const ROLES_PATH = "roles"

export const RoleService = {
    get: (search?: string) => {
        return instance.get<IRole[]>(ROLES_PATH, search ? {params: {search}} : {})
    }
}