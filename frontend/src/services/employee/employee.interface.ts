import { IService } from "../service/service.interface"
import { ISpec } from "../spec/spec.interface"
import { IFile } from "../upload/upload.interface"
import { IUser } from "../user/user.interface"

export interface IEmployee {
    id: number
    name: string
    surname: string
    image: IFile
    specialization: ISpec
    services?: IService[] 
}

export interface IEmployeeWithIdsDto extends Omit<IEmployee, "specialization" | "services" | "image" | "id"> {
    id?: number
    imageId: number
    specializationId: number
    serviceIds?: number[] 
    image: IFile
    userId: number
}

export interface IEmployeeWithUserDto extends IEmployee {
    specialization: ISpec
    services?: IService[] 
    user: IUser
}