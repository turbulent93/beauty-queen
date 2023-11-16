import { IAppointment } from "@/services/app/app.interface"
import { APPOINTMENTS_LS_KEY } from "./constants"

export const getLocalStorageAppointments = (): IAppointment[] => {
    const storagedAppointments = localStorage.getItem(APPOINTMENTS_LS_KEY)
    const appointments: IAppointment[] = storagedAppointments ? JSON.parse(storagedAppointments) : []

    return appointments
}