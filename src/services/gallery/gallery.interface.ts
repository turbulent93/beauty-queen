export interface IPhoto {
    id: number
    title: string
    serviceId: number
    source: string
}

export interface IGallery extends Omit<IPhoto, "id" | "source"> {
    photos: string[]
}

export type IPhotoDto = Omit<IPhoto, "id">