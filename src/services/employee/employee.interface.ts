import { IService } from "../service/service.interface"
import { ISpec } from "../spec/spec.interface"
import { IUserDto } from "../user/user.interface"

export interface IEmployee {
    id: number
    name: string
    surname: string
    specializationId: number
    image: string
    serviceIds: number[] 
    userId: number
}

export interface IEmployeeDto {
    id: number
    name: string
    surname: string
    specialization: ISpec
    image: string
    services: IService[] 
    user: IUserDto
}