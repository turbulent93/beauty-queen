export interface ISpec {
    id: number
    name: string
}

export type ISpecDto = Omit<ISpec, "id">