import { instance } from "@/api/api.interceptor"
import { IAppointment, IAppointmentDto, IResponseAppointmentDto } from "./app.interface"

const APPOINTMENTS_PATH = process.env.APPOINTMENTS_PATH!

export const AppService = {
    get(employeeId: number, scheduleId: number) {
        return instance.get<IResponseAppointmentDto[]>(APPOINTMENTS_PATH, {params: {employeeId, scheduleId}})
    },
    post(app: IAppointmentDto) {
        return instance.post<IAppointment>(APPOINTMENTS_PATH, app)
    },
    delete(id: number) {
        return instance.delete(`${APPOINTMENTS_PATH}/${id}`)
    }
}