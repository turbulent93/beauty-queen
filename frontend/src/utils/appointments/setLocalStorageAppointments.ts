import { IAppointment } from "@/services/app/app.interface"
import { APPOINTMENTS_LS_KEY } from "./constants"

export const setLocalStorageAppointments = (appointments: IAppointment[]) => {
    localStorage.setItem(APPOINTMENTS_LS_KEY, JSON.stringify(appointments))
}