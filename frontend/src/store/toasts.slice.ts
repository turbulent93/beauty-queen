import { IToast } from "@/components/toast/toast.interface"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type ErrorState = {
    toasts: IToast[]
}

const initialState: ErrorState = {
    toasts: []
}

const toastsSlice = createSlice({
    name: "toasts",
    initialState,
    reducers: {
        addToast: (state, action: PayloadAction<IToast>) => {
            state.toasts.push(action.payload)
            // if(state.length > 5) {
            //     state.shift()
            // }
        },
        removeToast: (state, action: PayloadAction<IToast>) => {
            state.toasts = state.toasts.filter(x => {
                return x.id != action.payload.id
            })
        }
    }
})

export const {addToast, removeToast} = toastsSlice.actions
export default toastsSlice.reducer