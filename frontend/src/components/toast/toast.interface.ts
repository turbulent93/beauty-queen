export type ToastType = "success" | "error" 

export interface IToast {
    id: number
    text: string
    type: ToastType
}