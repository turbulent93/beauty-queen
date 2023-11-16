import { IEmployeeWithIdsDto } from "../employee/employee.interface"
import { IUser } from "../user/user.interface"

export interface IAuthDto {
    accessToken: string
    refreshToken: string
}

export interface ILoginDto {
    login: string
    password: string
}

export interface IRegisterDto {
    login: string
    password: string
    roleId: number
    secretKey: string
}

export interface IAuthResponseDto {
    user: IUser
    employee?: IEmployeeWithIdsDto
}