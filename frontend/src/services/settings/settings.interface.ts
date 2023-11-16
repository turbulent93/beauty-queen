import { IFile } from "../upload/upload.interface"

export type ISettings = {
    faviconId?: number
    favicon?: IFile
    defaultStartWorkTime: string
    defaultEndWorkTime: string
} & IMainScreenSettings & IContactSettings

export interface IMainScreenSettings {
    mainPhotoId?: number
    mainPhoto?: IFile
    mainTitle?: string
    mainDescription?: string
}

export interface IContactSettings {
    phone?: string
    vk?: string
    mail?: string
    address?: string
}