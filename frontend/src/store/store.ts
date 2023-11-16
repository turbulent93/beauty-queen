import { configureStore } from "@reduxjs/toolkit"
import toastsReducer from "./toasts.slice"

const store = configureStore({
    reducer: {
        toasts: toastsReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch