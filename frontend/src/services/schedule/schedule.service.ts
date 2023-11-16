import { instance } from "@/api/api.interceptor"
import { IScheduleDto, ISchedule, FillScheduleDto } from "./schedule.interface"

const SCHEDULES_PATH = process.env.SCHEDULES_PATH || ""

export const ScheduleService = {
    async get(employeeId?: number, year?: number, month?: number) {
        const res = await instance.get<ISchedule[]>(SCHEDULES_PATH + "/" + employeeId, year && month ? {params: {year, month}} : {})

        return res.data
    },
    post(data: IScheduleDto) {
        return instance.post(SCHEDULES_PATH, data)
    }, 
    update(data: IScheduleDto) {
        return instance.put(`${SCHEDULES_PATH}/${data.id}`, data)
    },
    delete(id: number) {
        return instance.delete(`${SCHEDULES_PATH}/${id}`)
    },
    fill(data: FillScheduleDto) {
        return instance.post(SCHEDULES_PATH + "/fill", data)
    }
}