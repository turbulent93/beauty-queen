import { ADMIN_ROLE_NAME, MASTER_ROLE_NAME } from "@/utils/constants/roleNames"

export interface IRole {
    id: number
    name: (typeof ADMIN_ROLE_NAME | typeof MASTER_ROLE_NAME)
}