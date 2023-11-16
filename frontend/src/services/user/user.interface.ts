import { IRole } from "../roles/roles.interface"

export interface IUser {
    id: number
    login: string
    role: IRole
} 

export interface IUserDto {
    id: number
    login: string
    roleId: number
}

export interface IUpdateUserDto extends IUserDto{
    oldPassword?: string
    newPassword?: string
}