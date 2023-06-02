export interface IWork {
    id: number
    name: string
}

export type IWorkDto = Omit<IWork, "id"> 