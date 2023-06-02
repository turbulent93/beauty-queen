import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isOpen: false
    },
    reducers: {
        toggleIsOpen: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const { toggleIsOpen } = sidebarSlice.actions
export default sidebarSlice.reducer