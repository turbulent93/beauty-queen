import { IService } from "../service/service.interface"

export interface IPromo {
    id: number
    title: string
    description: string
    discount: number
    image: string
    services: IService[]
    periodFrom: Date
    periodTo: Date
}

export interface IPromoDto extends Omit<IPromo, "id"> {
    serviceIds: number[]
}