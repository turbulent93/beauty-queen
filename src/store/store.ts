import { configureStore } from "@reduxjs/toolkit"
import toastsReducer from "./toasts.slice"
import sidebarReducer from "./sidebar.slice"
import appointmentReducer from "./appointment.slice"

const store = configureStore({
    reducer: {
        errors: toastsReducer,
        sidebar: sidebarReducer,
        appointment: appointmentReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch