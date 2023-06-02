import { instance } from "@/api/api.interceptor"
import { IScheduleDto, ISchedule } from "./schedule.interface"

const SCHEDULES_PATH = process.env.SCHEDULES_PATH || ""

export const ScheduleService = {
    get(employeeId?: number, year?: number, month?: number) {
        return instance.get<ISchedule[]>(SCHEDULES_PATH + "/" + employeeId, year && month ? {params: {year, month}} : {})
    },
    post(data: IScheduleDto) {
        return instance.post(SCHEDULES_PATH, data)
    }, 
    delete(id: number) {
        return instance.delete(`${SCHEDULES_PATH}/${id}`)
    }
}