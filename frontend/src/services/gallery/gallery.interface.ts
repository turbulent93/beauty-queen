import { IFile } from "../upload/upload.interface"

export interface IPhoto {
    id: number
    serviceId: number
    fileId: number
    file: IFile
}

export interface IGallery extends Omit<IPhoto, "id" | "source"> {
    photos: IFile[]
}

export type IPhotoDto = Omit<IPhoto, "id">