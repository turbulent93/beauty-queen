import { instance } from "@/api/api.interceptor"
import { IAppointmentDto, IExtendedAppointment } from "./app.interface"

const APP_PATH = "/appointments"

export const AppService = {
    get(employeeId: number, scheduleId: number) {
        return instance.get<IExtendedAppointment[]>(`${APP_PATH}/${employeeId}/by-schedule/${scheduleId}`)
    },
    post(app: IAppointmentDto) {
        return instance.post(APP_PATH, app)
    }
}