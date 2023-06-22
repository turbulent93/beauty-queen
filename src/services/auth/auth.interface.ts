import { IRole } from "../roles/roles.interface"

export interface IAuthDto {
    accessToken: string
    refreshToken: string
}

export interface ILoginDto {
    login: string
    password: string
}

export interface IUserDto {
    userId: number
    login: string
    role: string
}