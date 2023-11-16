export interface IService {
    id: number
    name: string
    duration: number
    price: number
}

export type IRequestService = Omit<IService, "id">