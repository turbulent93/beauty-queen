import { IService } from "../service/service.interface"
import { IUnit } from "../unit/unit.interface"
import { IFile } from "../upload/upload.interface"

export interface IPromo {
    id: number
    title: string
    description: string
    discount: number
    imageId: number
    image: IFile
    services: IService[]
    unit: IUnit
    periodFrom: string
    periodTo: string
}

export interface IPromoDto extends Omit<IPromo, "id"> {
    serviceIds: number[]
    unitId: number
}