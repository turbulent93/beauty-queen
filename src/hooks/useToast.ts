import { addToast, IToast } from "@/store/toasts.slice";
import store from "@/store/store"

export const useToast = (toast: IToast | string, isSuccess?: boolean) => { 
    if (typeof toast == "string") {
        toast = {
            message: toast
        }
    }

    if(!(typeof toast.isSuccess == "boolean") && (typeof isSuccess == "boolean")) {
        toast.isSuccess = isSuccess
    }

    toast.id = new Date().valueOf()

    store.dispatch(addToast(toast))
}