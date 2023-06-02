import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export type IToast = {
    id?: number
    message: string
    isSuccess?: boolean
}

type ErrorState = {
    list: IToast[]
}

const initialState: ErrorState = {
    list: []
}

const toastsSlice = createSlice({
    name: "errors",
    initialState,
    reducers: {
        addToast: (state, action: PayloadAction<IToast>) => {
            state.list.push(action.payload)
            if(state.list.length > 5) {
                state.list.shift()
            }
        },
        removeToast: (state, action: PayloadAction<IToast>) => {
            state.list = state.list.filter(x => {
                return x.id != action.payload.id
            })
        }
    }
})

export const {addToast, removeToast} = toastsSlice.actions
export default toastsSlice.reducer