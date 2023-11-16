import { IEmployee } from "../employee/employee.interface"
import { IPromo } from "../promo/promo.interface"
import { ISchedule } from "../schedule/schedule.interface"
import { IService } from "../service/service.interface"

export interface IAppointment {
    id: number
    startAt: string
    endAt: string
    employeeId: number
    scheduleId: number
    serviceId: number
    promoId?: number
    phone: string

    service: IService
    employee: IEmployee
    schedule: ISchedule
    promotion: IPromo
}

export type IAppointmentDto = Omit<IAppointment, "id">

export interface IResponseAppointmentDto {
    id: number
    promo?: string
    discountedPrice: number
    discount?: string
    service: string
    date: string
    startAt: string
    endAt: string
    phone: string
}