import { IAppointmentDto } from "@/services/app/app.interface";
import { ISchedule } from "@/services/schedule/schedule.interface";
import { IService } from "@/services/service/service.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    appointment: Partial<IAppointmentDto>,
    schedule?: Partial<ISchedule>,
    duration?: number
}

const initialState: IInitialState = {
    appointment: {},
    schedule: {},
}

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        setService: (state, action: PayloadAction<IService>) => {
            state.appointment = {
                ...state.appointment,
                serviceId: action.payload.id
            }
            state.duration = action.payload.duration
        },
        setEmployeeId: (state, action: PayloadAction<number>) => {
            state.appointment = {
                ...state.appointment,
                employeeId: action.payload
            }
        },
        setScheduleId: (state, action: PayloadAction<number>) => {
            state.appointment = {
                ...state.appointment,
                scheduleId: action.payload
            }
        },
        setStartAt: (state, action: PayloadAction<string | undefined>) => {
            state.appointment = {
                ...state.appointment,
                startAt: action.payload
            }
        },
        setEndAt: (state, action: PayloadAction<string | undefined>) => {
            state.appointment = {
                ...state.appointment,
                endAt: action.payload
            }
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.appointment = {
                ...state.appointment,
                phone: action.payload
            }
        },
        setSchedule: (state, action: PayloadAction<ISchedule | undefined>) => {
            state.schedule = action.payload
        },
        resetAppointment: (state) => {
            state.appointment = {}
            state.duration = undefined
            state.schedule = {}
        }
    }
})

export const {setService, setEmployeeId, setScheduleId, setStartAt, setEndAt, setPhone, setSchedule, resetAppointment} = appointmentSlice.actions
export default appointmentSlice.reducer