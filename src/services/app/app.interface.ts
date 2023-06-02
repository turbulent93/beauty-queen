import { ISchedule } from "../schedule/schedule.interface"
import { IService } from "../service/service.interface"

export interface IAppointment {
    id: number
    startAt: string
    endAt: string
    employeeId: number
    scheduleId: number
    serviceId: number
    phone: string
}

export type IAppointmentDto = Omit<IAppointment, "id">

export interface IExtendedAppointment extends IAppointment {
    schedule: ISchedule
    service: IService
}