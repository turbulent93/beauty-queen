export interface ISchedule {
    id: number,
    date: string,
    employeeId: number
}

export type IScheduleDto = Omit<ISchedule, "id"> 