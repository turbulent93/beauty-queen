import store from "@/store/store"
import { addToast } from "@/store/toasts.slice"
import { TOAST_ERROR_MESSAGE, TOAST_SUCCESS_MESSAGE } from "@/utils/constants/toastMessages"

export const useSuccessToast = (text?: string) => { 
    store.dispatch(addToast({
        id: new Date().valueOf(),
        text: text || TOAST_SUCCESS_MESSAGE,
        type: "success"
    }))
}

export const useErrorToast = (text?: string) => { 
    store.dispatch(addToast({
        id: new Date().valueOf(),
        text: text || TOAST_ERROR_MESSAGE,
        type: "error"
    }))
}